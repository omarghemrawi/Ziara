import express from "express";
import {
  userSignUp,
  userLogin,
  updateProfile,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);
userRouter.put("/:id", updateProfile);

export default userRouter;
