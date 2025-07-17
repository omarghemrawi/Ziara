import {
  getNearbyPlaces,
  getNearbyReligiousPlaces,
  getNearbyRestaurants,
  getNearbyTouristicPlaces,
} from "../controllers/nearbyPlace.controller.js";
import {
  getRestaurants,
  getTouristAttractions,
  getReligiousPlaces,
} from "../controllers/places.controller.js";

import express from "express";

const placeRouter = express.Router();

// Nearby Places
placeRouter.post("/nearby/nearbyPlaces", getNearbyPlaces);
placeRouter.post("/nearby/restaurant", getNearbyRestaurants);
placeRouter.post("/nearby/tourist", getNearbyTouristicPlaces);
placeRouter.post("/nearby/religious", getNearbyReligiousPlaces);

// all place
router.get("/all/restaurant", getRestaurants);
router.get("/all/tourist", getTouristAttractions);
router.get("/all/religious", getReligiousPlaces);

export default placeRouter;
