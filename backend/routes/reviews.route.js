import express from "express";
import {
  createReview,
  deleteReview,
  getPlaceReviews,
  getUserReviews,
  getSingleReview,
  getAllReviews
} from "../controllers/review.controller.js";
import {verifyTokenAndRole} from "../middleware/auth.js"

const reviewRouter = express.Router();

reviewRouter.get("/user", verifyTokenAndRole(["user"]), getUserReviews);
reviewRouter.get("/place/:placeId", verifyTokenAndRole(["user", "client"]), getPlaceReviews);
reviewRouter.get("/", verifyTokenAndRole(["admin"]), getAllReviews);
reviewRouter.post("/", verifyTokenAndRole(["user"]), createReview);
reviewRouter.delete("/:id", verifyTokenAndRole(["admin", "user"]), deleteReview);
reviewRouter.get("/:reviewId", verifyTokenAndRole(["admin"]), getSingleReview);


export default reviewRouter;
