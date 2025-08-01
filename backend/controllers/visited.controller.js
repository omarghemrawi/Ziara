import User from "../models/user.model.js";

// ? Done
export const getVisitedPlaces = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, visitedPlaces: user.visitedPlaces });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const addToVisited = async (req, res) => {
  // const userId = req.user.id;
  const { userId, place_id } = req.body;

  if (!place_id) {
    return res
      .status(400)
      .json({ success: false, message: "Place ID is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if place is in favorites
    const isInFavorites = user.favoritePlaces.includes(place_id);
    if (!isInFavorites) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found in favorites" });
    }

    // Check if already in visited
    const alreadyVisited = user.visitedPlaces.includes(place_id);
    if (!alreadyVisited) {
      user.visitedPlaces.push(place_id);
    }

    // Remove from favoritePlaces
    user.favoritePlaces = user.favoritePlaces.filter((id) => id !== place_id);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Place moved to visited successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
