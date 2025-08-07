import express from "express";
import {
  createReview,
  deleteReview,
  getPlaceReviews,
  getUserReviews,
} from "../controllers/review.controller.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.delete("/:id", deleteReview);
reviewRouter.get("/place/:placeId", getPlaceReviews);
reviewRouter.get("/user/:userId", getUserReviews);

export default reviewRouter;
