import e from "express";
import {
  addToVisited,
  deleteFromVisited
} from "../controllers/visited.controller.js";
import { verifyTokenAndRole } from "../middleware/auth.js";

const visitedRouter = e.Router();

visitedRouter.post("/",verifyTokenAndRole(['user']), addToVisited);
visitedRouter.delete("/:placeId",verifyTokenAndRole(['user']), deleteFromVisited);

export default visitedRouter;
