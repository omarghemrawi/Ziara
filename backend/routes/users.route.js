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
  resetPassword

} from "../controllers/user.controller.js";
import { verifyTokenAndRole } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);
userRouter.put("/",verifyTokenAndRole(['user']), updateProfile);
userRouter.get("/:id",verifyTokenAndRole(['admin','user']), getUser);
userRouter.get("/verify/:token", verifyEmail);
userRouter.post("/verify-email", verifyEmailCode);
userRouter.post('/resend-code', resendVerificationCode);

userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);


export default userRouter;
