import express from "express"
import { createReport } from "../controllers/report.controller.js";

const reportRouter = express.Router()

//? Create Report
reportRouter.post("/",createReport)

export default reportRouter