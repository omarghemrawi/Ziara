import express from "express";

import {
  addToFav,
  deleteFav,
} from "../controllers/favorite.controller.js";
import { verifyTokenAndRole } from "../middleware/auth.js";

const favRouter = express.Router();

favRouter.post("/",verifyTokenAndRole(['user']), addToFav);
favRouter.delete("/",verifyTokenAndRole(['user']), deleteFav);

export default favRouter;
