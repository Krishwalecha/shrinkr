import router from "express";
import {
  getUserInfo,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/user.controller.js";

import {
  verifyJWT,
  verifyRefreshToken,
} from "../middlewares/auth.middleware.js";

const userRouter = router();

userRouter.get("/me", verifyJWT, getUserInfo);
userRouter.patch("/me", verifyJWT, updateProfile);
userRouter.patch("/change-password", verifyJWT, changePassword);
userRouter.delete("/me", verifyJWT, deleteAccount);

export default userRouter;
