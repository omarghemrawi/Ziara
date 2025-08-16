import express from "express";

import {
  // getFavoritePlaces,
  addToFav,
  deleteFav,
} from "../controllers/favorite.controller.js";
import { verifyTokenAndRole } from "../middleware/auth.js";

const favRouter = express.Router();

// favRouter.get("/",verifyTokenAndRole, getFavoritePlaces);
favRouter.post("/",verifyTokenAndRole,verifyTokenAndRole(['user']), addToFav);
favRouter.delete("/",verifyTokenAndRole,verifyTokenAndRole(['user']), deleteFav);

export default favRouter;
