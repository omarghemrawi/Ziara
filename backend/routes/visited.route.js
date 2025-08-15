import e from "express";

import {
  // getVisitedPlaces,
  addToVisited,
} from "../controllers/visited.controller.js";
import { verifyToken } from "../middleware/auth.js";

const visitedRouter = e.Router();

// visitedRouter.get("/", getVisitedPlaces);
visitedRouter.post("/",verifyToken, addToVisited);

export default visitedRouter;
