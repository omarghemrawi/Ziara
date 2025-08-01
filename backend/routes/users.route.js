import express from "express";
import {
  userSignUp,
  userLogin,
  updateProfile,
  getUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);
userRouter.put("/", updateProfile);
userRouter.get("/:id", getUser);


export default userRouter;
