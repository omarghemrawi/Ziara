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
clientRouter.get("/", getAllPlaces);
clientRouter.get("/place", getPlace);
// ********************************* WebSite ********************//
clientRouter.post("/signup", SignUp);
clientRouter.post("/login", logIn);
clientRouter.put(
  "/update-profile",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "referenceImages", maxCount: 5 },
  ]),
  updateProfile
);
clientRouter.put("/subscribe", submitPayment);
clientRouter.put("/deactive-subscribe", deactivePayment);

export default clientRouter;
