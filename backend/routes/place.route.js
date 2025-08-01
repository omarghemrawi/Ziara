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
  getAllPlaces,

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
placeRouter.get("/nearby/nearbyPlaces", getNearbyPlaces);
placeRouter.get("/nearby/nearbyRestaurant", getNearbyRestaurants);
placeRouter.get("/nearby/nearbyTourist", getNearbyTouristicPlaces);
placeRouter.get("/nearby/nearbyReligious", getNearbyReligiousPlaces);

// all place + send city by query
placeRouter.get("/all/restaurant", getRestaurants);
placeRouter.get("/all/tourist", getTouristAttractions);
placeRouter.get("/all/religious", getReligiousPlaces);
placeRouter.get("/all/places",getAllPlaces )
// placeRouter.post("/all/login", log);

// Favorites Places
placeRouter.get("/favorite/getAllFavorites", getFavoritePlaces);
placeRouter.post("/favorite/add", addToFav);
placeRouter.post("/favorite/delete", deleteFav);

// Visited Places
placeRouter.get("/visited/getAllVisited", getVisitedPlaces);
placeRouter.post("visited/add", addToVisited);

// Get Single Place with send its field [favoritePlaces or visitedPlaces]
placeRouter.get("/getSinglePlace", getPlace);

// Shop Router

placeRouter.get("/shop", getShops);

export default placeRouter;
