import Review from "../models/review.model.js";
import User from "../models/user.model.js";

// Create review
export const createReview = async (req, res) => {
  try {
    const { placeId, rating, comment, userName } = req.body;

    const review = new Review({
      placeId,
      rating,
      comment,
      userName,
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
    const reviews = await Review.find({ placeId: req.params.placeId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all reviews for a user
export const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("review");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      reviews: user.review,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
