import express from "express";
import {
  userLogin,
  userSignUp,
  getReviews,
  createReview,
  getUserReviews,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

// SignUp User
userRouter.post("/signup", userSignUp);

// Login User
userRouter.post("/login", userLogin);

// Create Review
userRouter.post("/review/create", createReview);

// Get User Reviews
userRouter.get("/review/getUserReviews", getUserReviews);

// Get All Reviews
userRouter.get("/review/getAllReviews", getReviews);

export default userRouter;
