import React, { useState, useEffect } from 'react';
// If you are using a standard Create React App setup or similar,
// you might import your CSS like this:
// import './report.css'; // Make sure report.css is in the same directory or adjust path

// --- Embedded Report Data (formerly from geninfo.py) ---
// IMPORTANT: Changes made to report statuses here will NOT be persistent
// if you refresh the browser, as they are only in memory.
const initialReportsData = [
    {
        "id": "R001",
        "timestamp": "2025-07-28T14:30:00Z",
        "reportedBy": "user_101 (client_app)",
        "type": "place",
        "targetId": "Baalbek",
        "description": "The information about Baalbek's opening hours is incorrect on the app. It's currently closed on Mondays, but the app says it's open daily.",
        "status": "pending"
    },
    {
        "id": "R002",
        "timestamp": "2025-07-29T09:15:00Z",
        "reportedBy": "user_202 (mobile_user)",
        "type": "review",
        "targetId": "review_45678",
        "description": "A review for 'Em Sherif Restaurant' contains inappropriate language. Please moderate.",
        "status": "pending"
    },
    {
        "id": "R003",
        "timestamp": "2025-07-29T16:00:00Z",
        "reportedBy": "admin_test (internal)",
        "type": "hotel",
        "targetId": "Phoenicia Hotel Beirut",
        "description": "Phoenicia Hotel's contact number needs to be verified; it might have changed.",
        "status": "action taken"
    },
    {
        "id": "R004",
        "timestamp": "2025-07-30T10:00:00Z",
        "reportedBy": "user_303 (client_app)",
        "type": "activity",
        "targetId": "Jeita Grotto",
        "description": "The cable car at Jeita Grotto was not operational today, but the app didn't mention it.",
        "status": "pending"
    },
    {
        "id": "R005",
        "timestamp": "2025-07-31T08:00:00Z",
        "reportedBy": "user_404 (mobile_user)",
        "type": "shop",
        "targetId": "ABC Verdun",
        "description": "The contact number for ABC Verdun is outdated.",
        "status": "pending"
    },
    {
        "id": "R006",
        "timestamp": "2025-08-01T11:45:00Z",
        "reportedBy": "client_505 (client_app)",
        "type": "restaurant",
        "targetId": "Al Sultan Brahim",
        "description": "Al Sultan Brahim's location on the map is slightly off.",
        "status": "pending"
    }
];

function ReportPage() {
    const [reports, setReports] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Simulate fetching data (now from local array)
    useEffect(() => {
        setLoading(true);
        setError(null);
        try {
            // Simulate a small delay for "loading" effect
            setTimeout(() => {
                setReports(initialReportsData);
                setLoading(false);
            }, 500); // 0.5 second delay
        } catch (err) {
            setError("Failed to load initial report data.");
            setLoading(false);
        }
    }, []); // Empty dependency array means this runs once on mount

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    const updateReportStatus = (reportId, newStatus) => {
        setReports(prevReports => {
            const updatedReports = prevReports.map(report => {
                if (report.id === reportId) {
                    const oldStatus = report.status;
                    if (oldStatus !== newStatus) {
                        // Simulate sending email to admin by logging to console
                        console.log(`EMAIL SIMULATION: Admin notified about report '${reportId}' status change from '${oldStatus}' to '${newStatus}'.`);
                        alert(`Report ${reportId}: Status updated to '${newStatus}'. Admin notified (simulated).`);
                    }
                    return { ...report, status: newStatus };
                }
                return report;
            });
            return updatedReports;
        });
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

    if (loading) {
        return (
            <div className="reports-container">
                <p className="loading-message">Loading reports...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="reports-container">
                <p className="error-message">{error}</p>
            </div>
        );
    }

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
                        filteredReports.map(report => (
                            <div className="report-card" key={report.id}>
                                <h3>Report ID: {report.id} <span style={{ fontSize: '0.8em', color: '#666' }}>({new Date(report.timestamp).toLocaleString()})</span></h3>
                                <div className="report-detail"><strong>Reported By:</strong> {report.reportedBy}</div>
                                <div className="report-detail"><strong>Type:</strong> {report.type}</div>
                                <div className="report-detail"><strong>Target ID:</strong> {report.targetId}</div>
                                <div className="report-description"><strong>Description:</strong><br/>{report.description}</div>
                                <div className="report-status-section">
                                    <label htmlFor={`status-${report.id}`}><strong>Status:</strong></label>
                                    <select 
                                        id={`status-${report.id}`} 
                                        className="report-status-dropdown"
                                        value={report.status}
                                        onChange={(e) => updateReportStatus(report.id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="action taken">Action Taken</option>
                                    </select>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </>
    );
}

export default ReportPage;