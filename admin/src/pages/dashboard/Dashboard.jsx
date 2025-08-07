import React from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom"; // If using react-router

const Dashboard = () => {
  let navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>
          Welcome to your admin panel. Manage places and view client places.
        </p>
      </header>
      <section className="dashboard-content">
        <div
          className="dashboard-card"
          onClick={() => navigate("/clientPlace")}
          style={{ cursor: "pointer" }}
        >
          <h2>Client Places</h2>
          <p>View and manage places created by clients.</p>
        </div>
        <div
          className="dashboard-card"
          onClick={() => navigate("/staticPlace")}
          style={{ cursor: "pointer" }}
        >
          <h2>Static Places</h2>
          <p>Manage static places in the system.</p>
        </div>
         <div
          className="dashboard-card"
          onClick={() => navigate("/report")}
          style={{ cursor: "pointer" }}
        >
          <h2>Reports</h2>
          <p>view reports and manage them.</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
