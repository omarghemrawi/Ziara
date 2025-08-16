import express from "express"
import { createReport, deleteReport, getReports } from "../controllers/report.controller.js";
import {verifyToken} from "../middleware/auth.js"

const reportRouter = express.Router()

//? Create Report
reportRouter.post("/",verifyToken,createReport)
reportRouter.get("/",getReports)
reportRouter.delete("/:reportId",deleteReport)

export default reportRouter