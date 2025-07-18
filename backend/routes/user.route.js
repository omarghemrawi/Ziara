import express from "express";
import { userLogin, userSignUp } from "../controllers/user.controller.js";

const userRouter = express.Router();

// SignUp User
userRouter.post("/signup", userSignUp);

// Login User
userRouter.post("/login", userLogin);

export default userRouter;
