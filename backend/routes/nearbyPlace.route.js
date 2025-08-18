import express from "express";

import { getNearbyPlaces,getNearbyReligiousPlaces,getNearbyRestaurants,getNearbyTouristicPlaces } from "../controllers/nearbyPlace.controller.js";

const nearbyRouter = express.Router();

nearbyRouter.get("/religious", getNearbyReligiousPlaces);
nearbyRouter.get("/restaurant", getNearbyRestaurants);
nearbyRouter.get("/touristic", getNearbyTouristicPlaces);
nearbyRouter.get("/nearbyPlace", getNearbyPlaces);

export default nearbyRouter;
