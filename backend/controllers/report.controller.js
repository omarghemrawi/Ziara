import Report from '../models/report.model.js';

export const createReport = async (req, res) => {
  try {
    const { type, complainant, targetId, reportedBy, reason } = req.body;

    // 1️⃣ Check required fields
    if (!type || !complainant || !targetId || !reportedBy || !reason) {
    return res.status(400).json({success:false , message: 'All fields are required' });
    }

    // 3️⃣ Always work with an array
    const reasonsArray = Array.isArray(reason) ? reason : [reason];

    // 5️⃣ Create report
    const newReport = new Report({
    type,
    complainant,
    targetId,
    reportedBy,
    reason: reasonsArray
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
    const allReport  = await Report.find()
    res.status(201).json({success:true , reports: allReport})
  } catch (error) {
    res.status(500).json({success:false , message:error.message})
    console.log(error)
  }
}