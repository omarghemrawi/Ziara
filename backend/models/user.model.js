import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{type : String , default:"user"},
    favoritePlaces: [],
    visitedPlaces: [],
    about: String,
    profile: String,
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    currentCity: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
