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
  // Verify that the user has 'client' role before updating profile
  verifyTokenAndRole(['client']),

  // Middleware to dynamically set the max number of reference images allowed
  (req, res, next) => {
    // Fetch client from DB to get their current plan
    ClientPlace.findById(req.userId)
      .then(client => {
        if (!client) {
          return res.status(404).json({ success: false, message: "Client not found" });
        }

        // Determine max reference images based on plan
        const maxImages = client?.plan?.imageLimit || 5;

        // Setup multer upload fields
        // 'profile' = single profile image (maxCount: 1)
        // 'referenceImages' = array of reference images limited by maxImages
        upload.fields([
          { name: "profile", maxCount: 1 },
          { name: "referenceImages", maxCount: maxImages },
        ])(req, res, next);
      })
      .catch(err => {
        console.error("Error fetching plan info:", err);
        res.status(500).json({ success: false, message: "Error fetching plan info" });
      });
  },

  // Controller to handle the actual profile update
  updateProfile
);

clientRouter.put("/complete-register",verifyTokenAndRole(['client']),completeRegister)
clientRouter.put("/subscribe",verifyTokenAndRole(['client']), submitPayment);
clientRouter.put("/deactive-subscribe",verifyTokenAndRole(['admin']) , deactivePayment);
export default clientRouter;



