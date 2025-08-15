import express from "express";

import {
  // getFavoritePlaces,
  addToFav,
  deleteFav,
} from "../controllers/favorite.controller.js";
import { verifyToken } from "../middleware/auth.js";

const favRouter = express.Router();

// favRouter.get("/",verifyToken, getFavoritePlaces);
favRouter.post("/",verifyToken, addToFav);
favRouter.delete("/",verifyToken, deleteFav);

export default favRouter;
