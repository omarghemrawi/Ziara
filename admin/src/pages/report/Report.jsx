import React, { useState, useEffect } from 'react';
import axios from "axios";

function ReportPage() {
    const [reports, setReports] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [details, setDetails] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const fetchTargetDetails = async (place_id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/client/place/${place_id}`);
            if (res.data.success) {
                setDetails(res.data.place);
                setShowDetails(true);
            } else {
                alert("Failed to fetch target details");
            }
        } catch (error) {
            console.error("Error fetching target details:", error);
        }
    };

    const deactivate = async (placeId , reportId) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/client/deactive-subscribe",
        { userId: placeId }
      );
      if (res) {
        alert("deactive successfly");
        await axios.delete(`http://localhost:5000/api/report/${reportId}`);
        getReports();
      }
    } catch (error) {
      console.log(error);
    }
  };

    const getReports = async () => {
        const res = await axios.get("http://localhost:5000/api/report");
        if (res.data.success) {
            setReports(res.data.reports);
        }
    };

    const takeAction= async()=>{}

    useEffect(() => {
        getReports();
    }, []);

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    const getFilteredReports = () => {
        if (filterType === 'all') {
            return reports;
        }
        return reports.filter(report => {
            const reportedByLower = report.reportedBy.toLowerCase();
            if (filterType === 'user') {
                return reportedByLower.includes('(mobile_user)');
            } else if (filterType === 'client') {
                return reportedByLower.includes('(client_app)');
            }
            return false;
        });
    };

    const filteredReports = getFilteredReports();

    return (
        <>
            <header>
                <h1>Report Management Dashboard</h1>
            </header>

            <main>
                <div className="filter-section">
                    <label htmlFor="reportTypeFilter">Filter by Source:</label>
                    <select id="reportTypeFilter" value={filterType} onChange={handleFilterChange}>
                        <option value="all">All Reports</option>
                        <option value="user">User Reports</option>
                        <option value="client">Client Reports</option>
                    </select>
                </div>

                <div id="reportsContainer" className="reports-container">
                    {filteredReports.length === 0 ? (
                        <p className="loading-message">No reports found for the selected filter.</p>
                    ) : (
                        filteredReports.map((report, index) => (
                            <div className="report-card" key={index}>
                                <h3>Reported BY: {report.reportedBy.name || report.reportedBy.username}<br />
                                    Email: {report.reportedBy.email}</h3>

                                <h4 style={{ fontSize: '0.8em', color: '#666' }}>
                                    ({new Date(report.createdAt).toLocaleString()})
                                </h4>

                                <div className="report-detail"><strong>Target:</strong> {report.targetId.name || report.targetId.username}</div>
                                <div className="report-detail"><strong>Email:</strong> {report.targetId.email}</div>
                                <div className="report-description"><strong>Reason:</strong><br />{report.reason.join(', ')}</div>

                                <div className="report-status-section">
                                    {report.status !== 'action taken' && (
                                        <button
                                            className="action-taken-btn"
                                            onClick={() => {takeAction(report.reportedBy._id)}}
                                        >
                                            Mark as Action Taken
                                        </button>
                                    )}
                                    <button
                                        className="details-btn"
                                        onClick={() => { fetchTargetDetails(report.targetId._id || report.targetId); }}
                                    >
                                        Details Of Target
                                    </button>
                                    
                                </div>
                                <button className='diactive-btn' onClick={()=>{deactivate(report.targetId._id , report._id)}}>Diactive Place</button>
                            </div>
                        ))
                    )}
                </div>

                {showDetails && details && (
                    <>
                        <div
                            className="modal-backdrop"
                            onClick={() => setShowDetails(false)}
                        ></div>
                        <div className="details-block">
                            <h2>Target Details</h2>

                            <p><strong>Name:</strong> {details.name}</p>

                            {details.profile && (
                                <img
                                    className="details-block__profile-image"
                                    src={details.profile}
                                    alt={`${details.name} profile`}
                                />
                            )}

                            {details.referenceImages && details.referenceImages.length > 0 && (
                                <div className="details-block__reference-images">
                                    {details.referenceImages.map((imgUrl, index) => (
                                        <img
                                            key={index}
                                            className="details-block__reference-image"
                                            src={imgUrl}
                                            alt={`${details.name} reference ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}

                            <p><strong>Description:</strong><br />{details.description}</p>

                            <button className="details-block__close-btn" onClick={() => setShowDetails(false)}>
                                Close
                            </button>
                        </div>
                    </>
                )}
            </main>
        </>
    );
}

export default ReportPage;
