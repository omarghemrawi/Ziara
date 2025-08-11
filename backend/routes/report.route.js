import express from "express"
import { createReport, getReports } from "../controllers/report.controller.js";

const reportRouter = express.Router()

//? Create Report
reportRouter.post("/",createReport)
reportRouter.get("/",getReports)

export default reportRouter