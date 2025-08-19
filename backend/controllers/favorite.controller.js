import User from "../models/user.model.js";

//! Add a place to user's favorites
// ============================
export const addToFav = async (req, res) => {
  try {
    const { placeId } = req.body;
    const userId = req.userId;

    // Validate input
    if (!placeId) {
      return res.status(400).json({ success: false, message: "Place ID is required" });
    }

    // Add to favorites (no duplicates due to $addToSet)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favoritePlaces: placeId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Location added successfully" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//! Remove a place from user's favorites
// ============================
export const deleteFav = async (req, res) => {
  try {
    const { placeId } = req.body;
    const userId = req.userId;

    // Validate input
    if (!placeId) {
      return res.status(400).json({ success: false, message: "Place ID is required" });
    }

    // Remove from favorites
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favoritePlaces: placeId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Location removed successfully" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
