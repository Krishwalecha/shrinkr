import crypto from "crypto";
import { User } from "../models/user.model.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
  generateTokens,
} from "./auth.controller.js";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";
const GITHUB_EMAILS_URL = "https://api.github.com/user/emails";

const oauthStateCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 10 * 60 * 1000,
};

const getClientUrl = () => process.env.CLIENT_URL?.replace(/\/$/, "");

const redirectToClient = (res, path) => {
  return res.status(302).redirect(`${getClientUrl()}${path}`);
};

const redirectWithError = (res, message) => {
  return redirectToClient(
    res,
    `/signin?error=${encodeURIComponent(message)}`,
  );
};

const sanitizeUsernameBase = (base) => {
  const normalized = (base || "")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 20);

  return normalized || "user";
};

const generateUniqueUsername = async (base) => {
  const normalizedBase = sanitizeUsernameBase(base);

  let username = normalizedBase;
  let suffix = 0;

  while (await User.findOne({ username })) {
    suffix += 1;
    username = `${normalizedBase}${suffix}`;
  }

  return username;
};

const issueSessionAndRedirect = async (res, user, path = "/dashboard/overview") => {
  const { accessToken, refreshToken } = generateTokens(user);

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return res
    .status(302)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .redirect(`${getClientUrl()}${path}`);
};

const findOrCreateOAuthUser = async ({
  provider,
  providerId,
  email,
  name,
  avatar,
}) => {
  const providerField = provider === "google" ? "googleId" : "githubId";

  let user = await User.findOne({ [providerField]: providerId });

  if (user) {
    return user;
  }

  const normalizedEmail = email?.trim().toLowerCase();

  if (normalizedEmail) {
    user = await User.findOne({ email: normalizedEmail });

    if (user) {
      user[providerField] = providerId;

      if (!user.avatar && avatar) {
        user.avatar = avatar;
      }

      await user.save({ validateBeforeSave: false });

      return user;
    }
  }

  if (!normalizedEmail) {
    throw new Error(`${provider} account has no accessible email`);
  }

  const usernameBase = normalizedEmail.split("@")[0] || name || provider;
  const username = await generateUniqueUsername(usernameBase);

  user = await User.create({
    username,
    email: normalizedEmail,
    name: name?.trim() || username,
    avatar,
    [providerField]: providerId,
  });

  return user;
};

const googleAuthRedirect = (req, res) => {
  const state = crypto.randomBytes(24).toString("hex");

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "online",
    prompt: "select_account",
  });

  res
    .status(302)
    .cookie("oauth_state_google", state, oauthStateCookieOptions)
    .redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
};

const googleAuthCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const savedState = req.cookies?.oauth_state_google;

    res.clearCookie("oauth_state_google", oauthStateCookieOptions);

    if (!code || !state || !savedState || state !== savedState) {
      return redirectWithError(res, "google_oauth_failed");
    }

    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      return redirectWithError(res, "google_oauth_failed");
    }

    const userInfoResponse = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await userInfoResponse.json();

    if (!userInfoResponse.ok || !profile.sub) {
      return redirectWithError(res, "google_oauth_failed");
    }

    const user = await findOrCreateOAuthUser({
      provider: "google",
      providerId: profile.sub,
      email: profile.email,
      name: profile.name,
      avatar: profile.picture,
    });

    return issueSessionAndRedirect(res, user);
  } catch (error) {
    return redirectWithError(res, "google_oauth_failed");
  }
};

const githubAuthRedirect = (req, res) => {
  const state = crypto.randomBytes(24).toString("hex");

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_CALLBACK_URL,
    scope: "read:user user:email",
    state,
    allow_signup: "true",
  });

  res
    .status(302)
    .cookie("oauth_state_github", state, oauthStateCookieOptions)
    .redirect(`${GITHUB_AUTH_URL}?${params.toString()}`);
};

const githubAuthCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const savedState = req.cookies?.oauth_state_github;

    res.clearCookie("oauth_state_github", oauthStateCookieOptions);

    if (!code || !state || !savedState || state !== savedState) {
      return redirectWithError(res, "github_oauth_failed");
    }

    const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      return redirectWithError(res, "github_oauth_failed");
    }

    const authHeader = { Authorization: `Bearer ${tokenData.access_token}` };

    const userResponse = await fetch(GITHUB_USER_URL, {
      headers: { ...authHeader, "User-Agent": "shrinkr-app" },
    });

    const profile = await userResponse.json();

    if (!userResponse.ok || !profile.id) {
      return redirectWithError(res, "github_oauth_failed");
    }

    let email = profile.email;

    if (!email) {
      const emailsResponse = await fetch(GITHUB_EMAILS_URL, {
        headers: { ...authHeader, "User-Agent": "shrinkr-app" },
      });

      if (emailsResponse.ok) {
        const emails = await emailsResponse.json();
        const primaryEmail = emails.find((e) => e.primary && e.verified);
        const verifiedEmail = emails.find((e) => e.verified);

        email = primaryEmail?.email || verifiedEmail?.email;
      }
    }

    const user = await findOrCreateOAuthUser({
      provider: "github",
      providerId: String(profile.id),
      email,
      name: profile.name || profile.login,
      avatar: profile.avatar_url,
    });

    return issueSessionAndRedirect(res, user);
  } catch (error) {
    return redirectWithError(res, "github_oauth_failed");
  }
};

export {
  googleAuthRedirect,
  googleAuthCallback,
  githubAuthRedirect,
  githubAuthCallback,
};
