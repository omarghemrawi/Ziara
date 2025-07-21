import mongoose from "mongoose";

export const placeSchema = new mongoose.Schema(
  {
    place_id: { type: String, required: true },
    name: String,
    lat: Number,
    lng: Number,
    address: String,
    rating: Number,
    types: [String],
    photo_reference: String,
    // opening_hours: Boolean,
  },
  { _id: false }
);

// export const Place = mongoose.model("Place", placeSchema);
// export  placeSchema;
