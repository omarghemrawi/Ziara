import express from "express";
import {
  userSignUp,
  userLogin,
  updateProfile,
  getUser,
  verifyEmail,
  verifyEmailCode,
  resendVerificationCode,

} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);
userRouter.put("/",verifyToken, updateProfile);
userRouter.get("/:id", getUser);
userRouter.get("/verify/:token", verifyEmail);
userRouter.post("/verify-email", verifyEmailCode);
userRouter.post('/resend-code', resendVerificationCode);




export default userRouter;
