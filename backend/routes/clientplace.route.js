import express from "express";
import {
  getAllPlaces,
  getPlace,
  SignUp,
  updateProfile,
  submitPayment,
  logIn,
  deactivePayment,
} from "../controllers/clientPlace.controller.js";

import upload from "../middleware/multer.js";

const clientRouter = express.Router();

// Get all places
clientRouter.get("/places", getAllPlaces);

// Get specific place
clientRouter.get("/place", getPlace);
// ********************************* WebSite ********************//

// SignUp Client
clientRouter.post("/signup", SignUp);

// Login Client
clientRouter.post("/login", logIn);

// update Client Profile
clientRouter.put(
  "/update-profile",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "referenceImages", maxCount: 5 },
  ]),
  updateProfile
);
// Subscribe Client
clientRouter.put("/subscribe", submitPayment);

// Deactive subscribe

clientRouter.put("/deactive-subscribe", deactivePayment);

export default clientRouter;
