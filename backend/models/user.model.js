import mongoose from "mongoose";
// placeSchema badda chell yemken
// import { placeSchema } from "./place.model.js";
import { reviewSchema } from "./review.model.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoritePlaces: [],
  visitedPlaces: [],
  about: String,
  profileImage: String,
  review: [reviewSchema],
  currentCity: String,
});

const User = mongoose.model("User", userSchema);
export default User;


