import User from "../models/user.model.js";

// ???Done
// Get favorite Places a user
export const getFavoritePlaces = async (req, res) => {
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
      .json({ success: true, favoritePlaces: user.favoritePlaces });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const addToFav = async (req, res) => {
  try {
    const { placeId, userId } = req.body;
    // const userId = req.user.id;
    if (!placeId) {
      return res
        .status(400)
        .json({ success: false, message: "Place Data is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { favoritePlaces: placeId },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Location added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const deleteFav = async (req, res) => {
  try {
    const { placeId, userId } = req.body;
    // const userId = req.user.id;
    if (!placeId) {
      return res
        .status(400)
        .json({ success: false, message: "Place ID is required" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favoritePlaces: placeId } },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ message: "Location removed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
