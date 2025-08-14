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
} from "../controllers/clientPlace.controller.js";
import { verifyToken } from "../middleware/auth.js";
import ClientPlace from "../models/clientPlace.model.js";

import upload from "../middleware/multer.js";

const clientRouter = express.Router();

// Get all places
clientRouter.get("/", getAllPlaces);
clientRouter.get("/place/:place_id", getPlace);
// ********************************* WebSite ********************//
clientRouter.post("/signup", SignUp);
clientRouter.post("/login", logIn);
// clientRouter.put(
//   "/update-profile",
//   verifyToken,
  
//       upload.fields([
//         { name: "profile", maxCount: 1 },
//         { name: "referenceImages", maxCount: 7 },
//       ]),
//   updateProfile
// );
clientRouter.put(
  "/update-profile",
  verifyToken,
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
clientRouter.put("/complete-register",verifyToken,completeRegister)
clientRouter.put("/subscribe",verifyToken, submitPayment);
clientRouter.put("/deactive-subscribe", deactivePayment);

export default clientRouter;



