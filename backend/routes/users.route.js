import express from "express";
import {
  userSignUp,
  userLogin,
  updateProfile,
  getUser,
  verifyEmail
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);
userRouter.put("/", updateProfile);
userRouter.get("/:id", getUser);
userRouter.get("/verify/:token", verifyEmail);



export default userRouter;
