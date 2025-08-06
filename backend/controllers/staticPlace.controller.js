import StaticPlace from "../models/staticPlace.model.js";

// ?? Done
export const getAllPlaces = async (req, res) => {
  try {
    const places = await StaticPlace.find().sort({ createdAt: -1 });
    res.json({ success: true, places: places });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const createPlace = async (req, res) => {
  try {
    const place = new StaticPlace(req.body);
    await place.save();
    res
      .status(201)
      .json({ success: true, message: "Place created", data: place });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const updatePlace = async (req, res) => {
  try {
    const place = await StaticPlace.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found" });
    }
    res.json({ success: true, message: "Place updated", data: place });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const deletePlace = async (req, res) => {
  try {
    const place = await StaticPlace.findByIdAndDelete(req.params.id);
    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found" });
    }
    res.json({ success: true, message: "Place deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// !!
export const getPlace = async (req, res) => {
  try {
    const place = await StaticPlace.findById(req.params.id);
    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found" });
    }
    res.json({ success: true, data: place });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
