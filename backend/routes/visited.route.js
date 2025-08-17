import e from "express";
import {
  addToVisited,
} from "../controllers/visited.controller.js";
import { verifyTokenAndRole } from "../middleware/auth.js";

const visitedRouter = e.Router();

visitedRouter.post("/",verifyTokenAndRole(['user']), addToVisited);

export default visitedRouter;
