import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const accessTokenOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

const refreshTokenOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, name } = req.body;

  if (
    !username?.trim() ||
    !email?.trim() ||
    !password?.trim() ||
    !name?.trim()
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = name.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-z0-9_]+$/;

  if (!emailRegex.test(normalizedEmail)) {
    throw new ApiError(400, "Please enter a valid email address");
  }

  if (!usernameRegex.test(normalizedUsername)) {
    throw new ApiError(
      400,
      "Username can only contain letters, numbers, and underscores",
    );
  }

  const existingUsername = await User.findOne({
    username: normalizedUsername,
  });

  if (existingUsername) {
    throw new ApiError(400, "Username is already taken");
  }

  const existingEmail = await User.findOne({
    email: normalizedEmail,
  });

  if (existingEmail) {
    throw new ApiError(400, "Email is already registered");
  }

  const user = await User.create({
    username: normalizedUsername,
    email: normalizedEmail,
    password,
    name: normalizedName,
  });

  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.refreshToken;

  return res
    .status(201)
    .json(new ApiResponse(201, userObj, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { id, password } = req.body;

  if (!id?.trim()) {
    throw new ApiError(400, "Username or email is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const normalizedid = id.trim().toLowerCase();

  const user = await User.findOne({
    $or: [{ username: normalizedid }, { email: normalizedid }],
  });

  if (!user) {
    throw new ApiError(400, "Invalid username/email or password");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid username/email or password");
  }

  const { accessToken, refreshToken } = generateTokens(user);

  user.refreshToken = refreshToken;

  await user.save({
    validateBeforeSave: false,
  });

  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.refreshToken;

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(new ApiResponse(200, userObj, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  if (!userId) {
    throw new ApiError(400, "User not found");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  user.refreshToken = undefined;

  await user.save({
    validateBeforeSave: false,
  });

  return res
    .status(200)
    .clearCookie("accessToken", accessTokenOptions)
    .clearCookie("refreshToken", refreshTokenOptions)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  if (!userId) {
    throw new ApiError(400, "User not found");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const { accessToken, refreshToken } = generateTokens(user);

  user.refreshToken = refreshToken;

  await user.save({
    validateBeforeSave: false,
  });

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(new ApiResponse(200, null, "Access token refreshed successfully"));
});

const generateTokens = (user) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return {
    accessToken,
    refreshToken,
  };
};

export { registerUser, loginUser, logoutUser, refreshAccessToken };
