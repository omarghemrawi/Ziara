import User from "../models/user.model.js";

// ? Done
export const addToVisited = async (req, res) => {
  const userId = req.userId;
  const { place_id } = req.body;

  if (!place_id) {
    return res.status(400).json({ success: false, message: "Place ID is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

      const isInFavorites = user.favoritePlaces.includes(place_id);
      if (!isInFavorites) {
        return res
          .status(404)
          .json({ success: false, message: "Place not found in favorites" });
      }


    // Add to visited if not already there
    const alreadyVisited = user.visitedPlaces.some(id => String(id) === String(place_id));
    if (!alreadyVisited) {
      user.visitedPlaces.push(place_id);
    }

    // Remove from favorites
    user.favoritePlaces = user.favoritePlaces.filter(id => String(id) !== String(place_id));

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Place moved to visited successfully",
      userId: user._id, // send back updated user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteFromVisited = async (req, res) => {
  const userId = req.userId;
  const { placeId } = req.params;

  if (!placeId) {
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

    // Remove from visited
    user.visitedPlaces = user.visitedPlaces.filter(
      (id) => String(id) !== String(placeId)
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Place deleted from visited successfully",
      userId : user._id, 
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};
