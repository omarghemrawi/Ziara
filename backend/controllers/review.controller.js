import Review from "../models/review.model.js";
import { updatePlaceRating } from "../utils/ratingPlace.js";
import User from "../models/user.model.js";

// Create review
export const createReview = async (req, res) => {
  try {
    const { placeId, rating, comment,  image , placeModel } = req.body;
    const  userId =req.userId

     if (!placeId || !rating || !comment  || !userId ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const review = new Review({
      placeId,
      rating,
      comment,
      userId,
      image,
      placeModel
    });

    await review.save();

    await updatePlaceRating(placeId, placeModel);

    res
      .status(201)
      .json({ success: true, message: "Review created", data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res
        .status(410)
        .json({ success: false, message: "Review already deleted" });
    }
    await updatePlaceRating(review.placeId, review.placeModel);

    res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all reviews for a place
export const getPlaceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ placeId: req.params.placeId })  // get all reviews for the place
  .populate('userId', 'username profileImage')                    // load name + profileImage from User
  .sort({ createdAt: -1 });    
    res.json({ success: true,  reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all reviews for a user 
export const getUserReviews = async (req, res) => {
  try {
    const  userId = req.userId
    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const reviews = await Review.find({ userId })
      .populate("placeId", "name profile") 
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get single review
export const getSingleReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Validate ID
    if (!reviewId) {
      return res.status(400).json({ success: false, message: "Review ID is required" });
    }

    // Find the review by ID
    const review = await Review.findById(reviewId)
      .populate("userId", "username email") 

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()                   
      .populate("userId", "username profileImage")         
      .populate("placeId", "name")                         
      .sort({ createdAt: -1 });                            // newest first

    res.json({ success: true, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};