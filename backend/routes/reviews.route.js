import express from "express";
import {
  createReview,
  deleteReview,
  getPlaceReviews,
  getUserReviews,
  getSingleReview
} from "../controllers/review.controller.js";
import {verifyToken} from "../middleware/auth.js"

const reviewRouter = express.Router();

reviewRouter.get("/user",verifyToken, getUserReviews);
reviewRouter.get("/place/:placeId", getPlaceReviews);

reviewRouter.post("/",verifyToken, createReview);
reviewRouter.delete("/:id",verifyToken, deleteReview);
reviewRouter.get("/:reviewId", getSingleReview);


export default reviewRouter;
