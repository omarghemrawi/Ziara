import Report from '../models/report.model.js';
import User from '../models/user.model.js';
import ClientPlace from '../models/clientPlace.model.js';

export const createReport = async (req, res) => {
  try {
    const { type, complainant, targetId, reportedBy, reason , review } = req.body;

    //  Check required fields 
    if (!type || !complainant || !targetId || !reportedBy || !reason) { 
    return res.status(400).json({success:false , message: 'All fields are required' });
    }

    // Always work with an array
    const reasonsArray = Array.isArray(reason) ? reason : [reason];

    //  Create report
    const newReport = new Report({
    type,
    complainant,
    targetId,
    reportedBy,
    reason: reasonsArray,
    reviewReported:review || null /*in case if Client create the report */
    });

    await newReport.save();

    res.status(201).json({
    success:true,
    message: 'Report created successfully',
    });

  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({   message: 'Server error',  success:false });
  }
};

export const getReports = async(req,res)=>{
  try {
    const allReports  = await Report.find().populate({
        path: 'targetId',
        select: 'name username email', 
      })
      .populate({
        path: 'reportedBy',
        select: 'name username email', 
      })
      .populate({
        path: 'reviewReported',
        select: 'comment image', 
      });

       const formattedReports = allReports.map(report => ({
      ...report.toObject(),
      targetName: report.targetId?.username || report.targetId?.name || null,
      reportedByName: report.reportedBy?.username || report.reportedBy?.name || null,
    }));


    res.status(201).json({success:true , reports: formattedReports})
  } catch (error) {
    res.status(500).json({success:false , message:error.message})
    console.log(error)
  }
}

export const deleteReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    if (!reportId) {
      return res.status(400).json({ success: false, message: "Report ID is required" });
    }

    const deletedReport = await Report.findByIdAndDelete(reportId);

    if (!deletedReport) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    return res.status(200).json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};