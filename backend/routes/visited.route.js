import e from "express";

import {
  getVisitedPlaces,
  addToVisited,
} from "../controllers/visited.controller.js";

const visitedRouter = e.Router();

visitedRouter.get("/", getVisitedPlaces);
visitedRouter.post("/", addToVisited);

export default visitedRouter;
