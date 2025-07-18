import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoritePlaces: [],
  about: String,
  profileImage: String,
  review: [], // will be related with object of city or place
  visitedPlaces: [],
  currentCity: String,
});

const User = mongoose.model("User", userSchema);
export default User;
