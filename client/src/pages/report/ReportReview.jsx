// src/pages/ReportReview.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ReportReview.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ReportReview() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useSelector(state => state.user.userData)
 const token = localStorage.getItem("token");

  // Guard: if opened directly without state, go back
  const reviewId = state?.reviewId;
  const reviewerName = state?.reviewerName || "";
  const reviewComment = state?.reviewComment || "";
  if (!reviewId) {
    navigate(-1);
  }

 const reasons = useMemo(() => [
  { id: "offTopic", title: "Off topic", desc: "Review doesn’t pertain to an experience at or with this business" },
  { id: "spam", title: "Spam", desc: "Review is from a bot, a fake account, or contains ads and promotions" },
  { id: "conflictOfInterest", title: "Conflict of interest", desc: "Review is from someone affiliated with the business or a competitor’s business" },
  { id: "profanity", title: "Profanity", desc: "Review contains swear words, has sexually explicit language, or details graphic violence" },
  { id: "discriminationOrHateSpeech", title: "Discrimination or hate speech", desc: "Review has harmful language about an individual or group based on identity" },
], []);

  const [selectedReasonId, setSelectedReasonId] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = (id) => setSelectedReasonId(id);

  const handleSubmit = async () => {
  if (!selectedReasonId) return;

  try {
    setSubmitting(true);

    const payload = {
      type: "User", 
      targetId: state?.userId, 
      reportedBy: user._id, 
      complainant: "ClientPlace", 
      review: state?.reviewId, 
      reason: [selectedReasonId] 
    };

    const res = await axios.post("http://localhost:5000/api/report", payload, {
    headers: { Authorization: `Bearer ${token}` }
  });

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed to submit report");
    }

    alert("Report submitted. Thank you.");
    navigate(-1);

  } catch (e) {
    console.error(e);
    alert("Could not submit report. Please try again.");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="rr-shell">
      <header className="rr-appbar">
        <button className="rr-back" onClick={() => navigate(-1)} aria-label="Back">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M15.5 19l-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <span className="rr-appbar-title">Report review</span>
      </header>

      <main className="rr-card">
        {/* centered title */}
        <h1 className="rr-title rr-title-center">Report review</h1>

        {/* Context (who/what you’re reporting) */}
        <div className="rr-context">
          <div className="rr-context-name">{reviewerName || "Unknown user"}</div>
          <div className="rr-context-comment">{reviewComment}</div>
        </div>

        {/* Reasons list (arrow removed) */}
        <ul className="rr-list">
          {reasons.map((r, idx) => (
            <li key={r.id} className="rr-item">
              <button
                type="button"
                className={`rr-row ${selectedReasonId === r.id ? "is-selected" : ""}`}
                onClick={() => handleSelect(r.id)}
                aria-label={`Choose: ${r.title}`}
              >
                <div className="rr-text">
                  <div className="rr-item-title">{r.title}</div>
                  <div className="rr-item-desc">{r.desc}</div>
                </div>
                {/* arrow removed */}
              </button>
              {idx < reasons.length - 1 && <div className="rr-divider" />}
            </li>
          ))}
        </ul>

        {/* Submit (centered, custom color) */}
        <div className="rr-actions rr-actions-center">
          <button
            type="button"
            className="rr-submit rr-submit-gold"
            disabled={!selectedReasonId || submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Submitting…" : "Submit report"}
          </button>
        </div>
      </main>
    </div>
  );
}
