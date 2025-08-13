import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { connectCloudinary } from "./config/cloudinary.js";
import userRouter from "./routes/users.route.js";
import staticPlaceRouter from "./routes/staticPlace.route.js";
import clientRouter from "./routes/clientplace.route.js";
import favRouter from "./routes/favorite.route.js";
import visitedRouter from "./routes/visited.route.js";
import reviewRouter from "./routes/reviews.route.js";
import reportRouter from "./routes/report.route.js";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.use("/api/user", userRouter);
app.use("/api/client", clientRouter);
app.use("/api/static", staticPlaceRouter);
app.use("/api/favorite", favRouter);
app.use("/api/visited", visitedRouter);
app.use("/api/review", reviewRouter);
app.use("/api/report", reportRouter);

app.listen(PORT, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server running on port ${PORT}`);
});

export default app;
