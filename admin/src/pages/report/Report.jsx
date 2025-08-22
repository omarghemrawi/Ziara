import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

function ReportPage() {
  const [reports, setReports] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [details, setDetails] = useState(null);
  const [showPlaceDetails, setShowPlaceDetails] = useState(false);
  const [showReviewDetails, setShowReviewDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("adminToken")

  // Fetch target details (Place or Review) //?
  const fetchTargetDetails = async (id, type) => {
    try {
      if (type === "place") {
        const res = await axios.get(`${API_URL}/api/client/place/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setDetails(res.data.place);
          setShowPlaceDetails(true);
        } else {
          alert("Failed to fetch target details");
        }
      } else {
        const res = await axios.get(`${API_URL}/api/review/${id}`, {
         headers: { Authorization: `Bearer ${token}` }
         });
        if (res.data.success) {
          setDetails(res.data.data);
          setShowReviewDetails(true);
        } else {
          alert("Failed to fetch target details");
        }
      }
    } catch (error) {
      console.error("Error fetching target details:", error);
    }
  };

  // Deactivate client place //?
  const deactivate = async (placeId, reportId) => {
    try {
      const res = await axios.put(`${API_URL}/api/client/deactive-subscribe`, { userId: placeId }, {
            headers: { Authorization: `Bearer ${token}` },});
      if (res) {
        await axios.delete(`${API_URL}/api/report/${reportId}`, {
            headers: { Authorization: `Bearer ${token}` },});
        getReports();
        toast.success("Deactivated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to deactivate");
    }
  };

  // Fetch reports //?
  const getReports = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/api/report`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      if (res.data.success) {
        setReports(res.data.reports);
      } else {
        toast.error("⚠️ Failed to fetch reports", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("❌ An error occurred while fetching reports", { position: "top-right", autoClose: 3000 });
    }
    setLoading(false); // stop loading
  };

  // Delete report
  const deleteReport = async (reportId) => {
    try {
     
      await axios.delete(`${API_URL}/api/report/${reportId}`, 
    {
      headers: { Authorization: `Bearer ${token}` }
    });
      toast.success("🗑️ Report deleted successfully", { position: "top-right", autoClose: 3000 });
      getReports();
    } catch (error) {
      console.error(error);
      if (error.response.status === 410) {
        toast.info("⚠️ Report was already deleted", { position: "top-right", autoClose: 3000 });
      } else {
        toast.error("❌ Failed to delete report", { position: "top-right", autoClose: 3000 });
      }
    }
  };

  // Delete review and related report
  const deleteReview = async (reviewId, reportId) => {
    try {
      const res = await axios.delete(`${API_URL}/api/review/${reviewId}`, 
    {
      headers: { Authorization: `Bearer ${token}` }
    });
      if (res.data.success) {
        toast("The review has been deleted.");
        deleteReport(reportId);
      } else {
        toast.error("⚠️ Failed to delete review.", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ An error occurred while deleting the review.", { position: "top-right", autoClose: 3000 });
    }
  };

  // Take action (send email)
  const takeAction = async (email) => {
    try {
      const emailData = {
        to: email,
        subject: "Report Resolved",
        message: "Thank you for your report, we resolved it.",
      };

      const res = await axios.post(`${API_URL}/api/email/send-email`, emailData, {
    headers: { Authorization: `Bearer ${token}` }
  });

      if (res.data.success) {
        toast.success("✅ Email sent successfully.");
      } else {
        toast.error("⚠ Failed to send email.");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ An error occurred while sending email.");
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  // Handle filter
  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  // Filter reports
  const getFilteredReports = () => {
    if (filterType === "all") return reports;
    return reports.filter((report) => report?.complainant?.toLowerCase() === filterType);
  };

  const filteredReports = getFilteredReports();

  return (
    <>
      <header>
        <h1>Report Management Dashboard</h1>
      </header>

      <main>
        {/* Filter Section */}
        <div className="filter-section">
          <label htmlFor="reportTypeFilter">Filter by Source:</label>
          <select id="reportTypeFilter" value={filterType} onChange={handleFilterChange}>
            <option value="all">All Reports</option>
            <option value="user">User Reports</option>
            <option value="clientplace">Client Reports</option>
          </select>
        </div>

        {/* Reports List */}
        <div id="reportsContainer" className="reports-container">
          {loading ? (
            <p className="loading-message">⏳ Loading reports...</p> // ✅ show loading state
          ) :
          (filteredReports.length === 0 ? (
            <p className="loading-message">No reports found for the selected filter.</p>
          ) : (
            filteredReports.map((report, index) => (
              <div className="report-card" key={index}>
                {/* Delete Report */}
                <button className="delete-report-btn" onClick={() => deleteReport(report._id)}>✖</button>

                <h3>
                  Reported BY: {report?.reportedBy?.name || report?.reportedBy?.username}
                  <br /> Email: {report?.reportedBy?.email}
                </h3>

                <h4 style={{ fontSize: "0.8em", color: "#666" }}>
                  ({new Date(report?.createdAt).toLocaleString()})
                </h4>

                <div className="report-detail">
                  <strong>Target:</strong> {report?.targetId?.name || report?.targetId?.username}
                </div>
                <div className="report-detail">
                  <strong>Email:</strong> {report?.targetId?.email}
                </div>
                <div className="report-description">
                  <strong>Reason:</strong>
                  <br />
                  {report.reason.join(", ")}
                </div>

                {/* Actions */}
                <div className="report-status-section">
                  {report.status !== "action taken" && (
                    <button className="action-taken-btn" onClick={() => takeAction(report.reportedBy.email)}>
                      Mark as Action Taken
                    </button>
                  )}

                  {report.type === "ClientPlace" ? (
                    <button className="details-btn" onClick={() => fetchTargetDetails(report.targetId._id, "place")}>
                      Details Of Client
                    </button>
                  ) : (
                    <button className="details-btn" onClick={() => fetchTargetDetails(report.reviewReported._id, "review")}>
                      Details Of User's Review
                    </button>
                  )}
                </div>

                {report.type === "ClientPlace" ? (
                  <button className="diactive-btn" onClick={() => deactivate(report.targetId._id, report._id)}>
                    Diactive Place
                  </button>
                ) : (
                  <button className="diactive-btn" onClick={() => deleteReview(report.reviewReported._id, report._id)}>
                    Delete Review
                  </button>
                )}
              </div>
              ))
            ) )}  
        </div>

        {/* Place Details Modal */}
        {showPlaceDetails && details && (
          <>
            <div className="modal-backdrop" onClick={() => setShowPlaceDetails(false)}></div>
            <div className="details-block">
              <h2>Target Details</h2>
              <p><strong>Name:</strong> {details.name}</p>

              {details.profile && (
                <img className="details-block__profile-image" src={details.profile} alt={`${details.name} profile`} />
              )}

              {details.referenceImages && details.referenceImages.length > 0 && (
                <div className="details-block__reference-images">
                  {details.referenceImages.map((imgUrl, index) => (
                    <img key={index} className="details-block__reference-image" src={imgUrl} alt={`${details.name} reference ${index + 1}`} />
                  ))}
                </div>
              )}

              <p><strong>Description:</strong><br />{details.description}</p>
              <button className="details-block__close-btn" onClick={() => setShowPlaceDetails(false)}>Close</button>
            </div>
          </>
        )}

        {/* Review Details Modal */}
        {showReviewDetails && details && (
          <>
            <div className="modal-backdrop" onClick={() => setShowReviewDetails(false)}></div>
            <div className="details-block">
              <h2>Review Details</h2>
              <p><strong>Username:</strong> {details.userId.username}</p>
              <p><strong>Comment:</strong><br />{details.comment}</p>

              {details.image && (
                <img className="details-block__profile-image" src={details.image} alt={`${details.username} review`} />
              )}

              <p><strong>Rating:</strong> {details.rating} / 5</p>
              <button className="details-block__close-btn" onClick={() => setShowReviewDetails(false)}>Close</button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default ReportPage;
