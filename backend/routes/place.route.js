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
  log,
} from "../controllers/places.controller.js";

import express from "express";

const placeRouter = express.Router();

// Nearby Places
placeRouter.post("/nearby/nearbyPlaces", getNearbyPlaces);
placeRouter.post("/nearby/nearbyrRestaurant", getNearbyRestaurants);
placeRouter.post("/nearby/nearbyTourist", getNearbyTouristicPlaces);
placeRouter.post("/nearby/nearbyReligious", getNearbyReligiousPlaces);

// all place
placeRouter.post("/all/restaurant", getRestaurants);
placeRouter.post("/all/tourist", getTouristAttractions);
placeRouter.post("/all/religious", getReligiousPlaces);
placeRouter.post("/all/login", log);

export default placeRouter;
