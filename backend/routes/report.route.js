import express from "express"
import { createReport, deleteReport, getReports } from "../controllers/report.controller.js";

const reportRouter = express.Router()

//? Create Report
reportRouter.post("/",createReport)
reportRouter.get("/",getReports)
reportRouter.delete("/:reportId",deleteReport)

export default reportRouter