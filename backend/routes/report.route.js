import express from "express"
import { createReport, deleteReport, getReports } from "../controllers/report.controller.js";
import {verifyTokenAndRole} from "../middleware/auth.js"

const reportRouter = express.Router()

//? Create Report
reportRouter.post("/",verifyTokenAndRole(['user' , "client"]),createReport)
reportRouter.get("/",verifyTokenAndRole(['admin']),getReports)
reportRouter.delete("/:reportId",verifyTokenAndRole(['user' , 'client']),deleteReport)

export default reportRouter