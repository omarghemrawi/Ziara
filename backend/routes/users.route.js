import express from "express";
import {
  userSignUp,
  userLogin,
  updateProfile,
  getUser,
  verifyEmail,
  verifyEmailCode,
  resendVerificationCode,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser

} from "../controllers/user.controller.js";
import { verifyTokenAndRole } from "../middleware/auth.js";

const userRouter = express.Router();

// Routes for public actions
userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);
userRouter.get("/verify/:token", verifyEmail);
userRouter.post("/verify-email", verifyEmailCode);
userRouter.post('/resend-code', resendVerificationCode);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

// Routes for admin actions
userRouter.get("/", verifyTokenAndRole(['admin']), getUsers);
userRouter.get("/:id", verifyTokenAndRole(['admin','user']), getUser);
userRouter.delete("/:id", verifyTokenAndRole(['admin']), deleteUser);

// Routes for user actions
userRouter.put("/", verifyTokenAndRole(['user']), updateProfile);



export default userRouter;
