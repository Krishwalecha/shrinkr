import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Url } from "../models/url.model.js";
import { Analytics } from "../models/analytics.model.js";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

const getUserInfo = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  if (!userId) {
    throw new ApiError(400, "User not found");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.refreshToken;

  return res
    .status(200)
    .json(new ApiResponse(200, userObj, "User info retrieved successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { name, email, username } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (name !== undefined) {
    if (!name.trim()) {
      throw new ApiError(400, "Name cannot be empty");
    }

    user.name = name.trim();
  }

  if (email !== undefined) {
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      throw new ApiError(400, "Please enter a valid email address");
    }

    if (normalizedEmail !== user.email) {
      const existingEmail = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: userId },
      });

      if (existingEmail) {
        throw new ApiError(400, "Email is already registered");
      }

      user.email = normalizedEmail;
    }
  }

  if (username !== undefined) {
    const normalizedUsername = username.trim().toLowerCase();
    const usernameRegex = /^[a-z0-9_]+$/;

    if (!usernameRegex.test(normalizedUsername)) {
      throw new ApiError(
        400,
        "Username can only contain letters, numbers, and underscores",
      );
    }

    if (normalizedUsername !== user.username) {
      const existingUsername = await User.findOne({
        username: normalizedUsername,
        _id: { $ne: userId },
      });

      if (existingUsername) {
        throw new ApiError(400, "Username is already taken");
      }

      user.username = normalizedUsername;
    }
  }

  await user.save();

  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.refreshToken;

  return res
    .status(200)
    .json(new ApiResponse(200, userObj, "Profile updated successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current and new password are required");
  }

  if (newPassword.length < 8) {
    throw new ApiError(400, "New password must be at least 8 characters");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Current password is incorrect");
  }

  user.password = newPassword;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password updated successfully"));
});

const deleteAccount = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  if (!userId) {
    throw new ApiError(400, "User not found");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const urls = await Url.find({ user: userId }).select("_id");

  const urlIds = urls.map((url) => url._id);

  if (urlIds.length > 0) {
    await Analytics.deleteMany({
      urlId: { $in: urlIds },
    });

    await Url.deleteMany({
      user: userId,
    });
  }

  await User.findByIdAndDelete(userId);

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "Account deleted successfully"));
});

export { getUserInfo, updateProfile, changePassword, deleteAccount };
