import express from "express";
import {
  getAllPlaces,
  getPlace,
  SignUp,
  updateProfile,
  submitPayment,
  logIn,
  deactivePayment,
  completeRegister,
  getAllPlacesToAdmin,
  deleteClient
} from "../controllers/clientPlace.controller.js";
import { verifyTokenAndRole } from "../middleware/auth.js";
import ClientPlace from "../models/clientPlace.model.js";

import upload from "../middleware/multer.js";

const clientRouter = express.Router();

// Get all places
clientRouter.delete("/:id",verifyTokenAndRole(['admin']) , deleteClient);
clientRouter.get("/", getAllPlaces);
clientRouter.get("/place/:place_id", getPlace);
clientRouter.get("/to-admin",verifyTokenAndRole(['admin']), getAllPlacesToAdmin);
clientRouter.post("/signup", SignUp);
clientRouter.post("/login", logIn);
clientRouter.put(
  "/update-profile",
  verifyTokenAndRole(['client']),
  (req, res, next) => {
    ClientPlace.findById(req.userId)
      .then(client => {
        const maxImages = client?.plan?.imageLimit || 5;
        upload.fields([
          { name: "profile", maxCount: 1 },
          { name: "referenceImages", maxCount: maxImages },
        ])(req, res, next);
      })
      .catch(err => res.status(500).json({ message: "Error fetching plan info" }));
  },
  updateProfile
);
clientRouter.put("/complete-register",verifyTokenAndRole(['client']),completeRegister)
clientRouter.put("/subscribe",verifyTokenAndRole(['client']), submitPayment);
clientRouter.put("/deactive-subscribe",verifyTokenAndRole(['admin']) , deactivePayment);
export default clientRouter;



