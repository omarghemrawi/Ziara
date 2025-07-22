import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  place_name: {
    type: String,
    required: true,
  },
  place_city: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  visitedDate: { type: Date, default: Date.now },
});
export const Review = mongoose.model("Review", reviewSchema);
