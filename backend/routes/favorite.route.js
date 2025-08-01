import express from "express";

import {
  getFavoritePlaces,
  addToFav,
  deleteFav,
} from "../controllers/favorite.controller.js";

const favRouter = express.Router();

favRouter.get("/", getFavoritePlaces);
favRouter.post("/", addToFav);
favRouter.delete("/", deleteFav);

export default favRouter;
