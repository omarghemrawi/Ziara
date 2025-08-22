import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ReportReview.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next"; // 👈 Added
const API_URL = process.env.REACT_APP_API_URL;

export default function ReportReview() {
  const { t } = useTranslation(); // 👈 Added
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useSelector((state) => state.user.userData);
  const token = localStorage.getItem("token");

  const reviewId = state?.reviewId;
  const reviewerName = state?.reviewerName || "";
  const reviewComment = state?.reviewComment || "";
  if (!reviewId) {
    navigate(-1);
  }

  const reasons = useMemo(
    () => [
      {
        id: "offTopic",
        title: t("report.offTopic.title"),
        desc: t("report.offTopic.desc"),
      },
      {
        id: "spam",
        title: t("report.spam.title"),
        desc: t("report.spam.desc"),
      },
      {
        id: "conflictOfInterest",
        title: t("report.conflict.title"),
        desc: t("report.conflict.desc"),
      },
      {
        id: "profanity",
        title: t("report.profanity.title"),
        desc: t("report.profanity.desc"),
      },
      {
        id: "discriminationOrHateSpeech",
        title: t("report.hateSpeech.title"),
        desc: t("report.hateSpeech.desc"),
      },
    ],
    [t]
  );

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
        reason: [selectedReasonId],
      };

      const res = await axios.post(`${API_URL}
/api/report`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed to submit report");
      }

      alert(t("report.success"));
      navigate(-1);
    } catch (e) {
      console.error(e);
      alert(t("report.fail"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rr-shell">
      <header className="rr-appbar">
        <button className="rr-back" onClick={() => navigate(-1)} aria-label={t("report.back")}>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M15.5 19l-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <span className="rr-appbar-title">{t("report.title")}</span>
      </header>

      <main className="rr-card">
        <h1 className="rr-title rr-title-center">{t("report.title")}</h1>

        <div className="rr-context">
          <div className="rr-context-name">{reviewerName || t("report.unknownUser")}</div>
          <div className="rr-context-comment">{reviewComment}</div>
        </div>

        <ul className="rr-list">
          {reasons.map((r, idx) => (
            <li key={r.id} className="rr-item">
              <button
                type="button"
                className={`rr-row ${selectedReasonId === r.id ? "is-selected" : ""}`}
                onClick={() => handleSelect(r.id)}
                aria-label={`${t("report.choose")}: ${r.title}`}
              >
                <div className="rr-text">
                  <div className="rr-item-title">{r.title}</div>
                  <div className="rr-item-desc">{r.desc}</div>
                </div>
              </button>
              {idx < reasons.length - 1 && <div className="rr-divider" />}
            </li>
          ))}
        </ul>

        <div className="rr-actions rr-actions-center">
          <button
            type="button"
            className="rr-submit rr-submit-gold"
            disabled={!selectedReasonId || submitting}
            onClick={handleSubmit}
          >
            {submitting ? t("report.submitting") : t("report.submit")}
          </button>
        </div>
      </main>
    </div>
  );
}
