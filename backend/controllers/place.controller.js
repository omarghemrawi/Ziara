import User from "../models/user.model.js";

export const getPlace = async (req, res) => {
  try {
    const { place_id, field } = req.query;
    const userId = req.user.id;
    if (!place_id || !field) {
      return res
        .status(400)
        .json({ success: false, message: "Place ID or field is required " });
    }
    const user = await User.findById(userId).select(field);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const place = user.favoritePlaces.find((fav) => fav.place_id === place_id);
    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found in favorites" });
    }
    return res.status(200).json({ success: true, place });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

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

// Edit userId + Done
export const addToFav = async (req, res) => {
  try {
    const { placeId , userId} = req.body;
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

// Edit userId + Done
export const deleteFav = async (req, res) => {
  try {
    const { placeId , userId } = req.body;
    // const userId = req.user.id;
    if (!placeId) {
      return res
        .status(400)
        .json({ success: false, message: "Place ID is required" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favoritePlaces:  placeId } },
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
  const userId = req.user.id;
  const { place_id } = req.params;

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

    const place = user.favoritePlaces.find((fav) => fav.place_id === place_id);
    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found in favorites" });
    }

    // Check if already in visited
    const alreadyVisited = user.visitedPlaces.some(
      (visited) => visited.place_id === place_id
    );

    if (!alreadyVisited) {
      user.visitedPlaces.push(place);
    }

    user.favoritePlaces.pull({ place_id: place_id });
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
// export const addToVisited = async(req,res)=>{}
