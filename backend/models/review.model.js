import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
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
  image: {
    type: String,
  },
  visitedDate: { type: Date, default: Date.now },
});
export const Review = mongoose.model("Review", reviewSchema);
