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
  deleteFav,
  getVisitedPlaces,
  getPlace,
  addToVisited,
} from "../controllers/place.controller.js";

import { getShops } from "../controllers/shop.controller.js";

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
// placeRouter.post("/all/login", log);

// Favorites Places
placeRouter.get("/favorite/getAllFavorites", getFavoritePlaces);
placeRouter.post("/favorite/add", addToFav);
placeRouter.post("/favorite/delete/:place_id", deleteFav);

// Visited Places
placeRouter.get("/visited/getAllVisited", getVisitedPlaces);
placeRouter.post("visited/add/:place_id", addToVisited);

// Get Single Place with send its field [favoritePlaces or visitedPlaces]
placeRouter.get("/getSinglePlace", getPlace);

// Shop Router

placeRouter.get("/shop", getShops);

export default placeRouter;
