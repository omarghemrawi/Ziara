import express from "express"
import { createReport, deleteReport, getReports } from "../controllers/report.controller.js";
import {verifyTokenAndRole} from "../middleware/auth.js"

const reportRouter = express.Router()

//? Create Report
reportRouter.get("/", verifyTokenAndRole(['admin']), getReports)
reportRouter.post("/",verifyTokenAndRole(['user' , "client"]),createReport)
reportRouter.delete("/:reportId",verifyTokenAndRole(['admin']),deleteReport)

export default reportRouter