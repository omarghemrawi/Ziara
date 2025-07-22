import {
  getNearbyPlaces,
  getNearbyReligiousPlaces,
  getNearbyRestaurants,
  getNearbyTouristicPlaces,
} from "../controllers/nearbyPlaces.controller.js";

import {
  getRestaurants,
  getTouristAttractions,
  getReligiousPlaces,
  log,
} from "../controllers/allPlaces.controller.js";

import {
  getFavoritePlaces,
  addToFav,
  removeFromFav,
  getVisitedPlaces,
  getPlace,
} from "../controllers/place.controller.js";

import express from "express";

const placeRouter = express.Router();

// Nearby Places
placeRouter.post("/nearby/nearbyPlaces", getNearbyPlaces);
placeRouter.post("/nearby/nearbyRestaurant", getNearbyRestaurants);
placeRouter.post("/nearby/nearbyTourist", getNearbyTouristicPlaces);
placeRouter.post("/nearby/nearbyReligious", getNearbyReligiousPlaces);

// all place + send city by query
placeRouter.post("/all/restaurant", getRestaurants);
placeRouter.post("/all/tourist", getTouristAttractions);
placeRouter.post("/all/religious", getReligiousPlaces);
placeRouter.post("/all/login", log);

// Favorites Places
placeRouter.get("/favorite/getAllFavorites", getFavoritePlaces);
placeRouter.post("/favorite/add", addToFav);
placeRouter.post("/favorite/remove/:id", removeFromFav);

// Visited Places
placeRouter.get("/visited/getAllVisited", getVisitedPlaces);

// Get Single Place with send its field [favoritePlaces or visitedPlaces]
placeRouter.get("/getSinglePlace", getPlace);
export default placeRouter;
