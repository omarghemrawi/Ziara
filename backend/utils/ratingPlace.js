import Review from "../models/review.model.js";
import StaticPlace from "../models/staticPlace.model.js";
import ClientPlace from "../models/clientPlace.model.js";

export const updatePlaceRating = async (placeId, placeModel) => {
  // Get all reviews for this place
  const reviews = await Review.find({ placeId });

  let avgRating = 0;
  if (reviews.length > 0) {
    avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  }

  // Update the correct model
  if (placeModel === "StaticPlace") {
    await StaticPlace.findByIdAndUpdate(placeId, { rate: avgRating });
  } else if (placeModel === "ClientPlace") {
    await ClientPlace.findByIdAndUpdate(placeId, { rate: avgRating });
  }

  return avgRating;
};
