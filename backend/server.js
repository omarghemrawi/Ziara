import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
import placeRouter from "./routes/place.route.js";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ||5000;
//Middleware
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/place", placeRouter);

//Start Server
app.listen(PORT, () => {
  connectCloudinary();
  connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
