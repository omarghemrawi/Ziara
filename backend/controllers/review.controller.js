import Review from "../models/review.model.js";
import User from "../models/user.model.js";

// Create review
export const createReview = async (req, res) => {
  try {
    const { placeId, rating, comment,  userId , image , placeModel } = req.body;
    // console.log(placeId , rating , comment  ,userName , userId , image , date)

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
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
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
    const userId = req.params.userId;

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
      .populate("userId", "username email") // correct field name for User
      // .populate("placeId", "name profile"); 

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
