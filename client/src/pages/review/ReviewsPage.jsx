import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ReviewsPage.css";

export default function ReviewsPage() {
  const { placeId } = useParams();
  const navigate = useNavigate();

  // ─── Data ─────────────────────────────────────────────
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    if (!placeId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/review/place/${placeId}`
      );
      setReviews(Array.isArray(res?.data?.reviews) ? res.data.reviews : []);
    } catch (e) {
      console.error(e);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [placeId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // normalized list
  const list = useMemo(() => (Array.isArray(reviews) ? reviews : []), [reviews]);
  const total = list.length;

  // average + distribution for summary
  const average = useMemo(() => {
    if (!total) return 0;
    const sum = list.reduce((a, r) => a + (Number(r?.rating) || 0), 0);
    return sum / total;
  }, [list, total]);

  const counts = useMemo(() => {
    const d = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    list.forEach((r) => {
      const k = Math.max(1, Math.min(5, Math.round(Number(r?.rating) || 0)));
      d[k] += 1;
    });
    return d;
  }, [list]);

  const formatDate = (d) => {
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return "";
    }
  };

  // ─── Menu (same design/behavior as your second code) ──
  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (id) => setOpenMenuId((p) => (p === id ? null : id));

  useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest(".menu-wrap")) setOpenMenuId(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // ─── Actions ──────────────────────────────────────────
  const onReport = (r) => {
    setOpenMenuId(null);
    // Map to your Report page payload
    const reviewerName =
      r?.user?.name || r?.userName || r?.author || "Anonymous";
    const reviewComment =
      r?.comment ?? r?.reviewComment ?? r?.text ?? r?.review ?? "";
    navigate("/report-review", {
      state: {
        reviewId: r?._id,
        reviewerName,
        reviewComment,
      },
    });
  };

  const onShare = async (r) => {
    setOpenMenuId(null);
    const reviewerName =
      r?.user?.name || r?.userName || r?.author || "Anonymous";
    const comment =
      (r?.comment ?? r?.reviewComment ?? r?.text ?? r?.review ?? "").toString();
    const title = `Review by ${reviewerName}`;
    const text = comment.slice(0, 120) + (comment.length > 120 ? "…" : "");
    const url = window.location.origin + `/reviews/${placeId}#review-${r?._id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch {
      /* user canceled */
    }
  };

  if (loading) return <p className="center">Loading reviews…</p>;

  return (
    <div className="reviews-page">
      <h1 className="page-title">Rating & Review</h1>

      {/* ───── Review summary (design from your second file) ───── */}
      <section className="review-summary">
        <div className="summary-header">Review summary</div>
        <div className="summary-body">
          <div className="bars">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = Math.round(((counts[star] || 0) / (total || 1)) * 100);
              return (
                <div key={star} className="bar-row">
                  <span className="bar-label">{star}</span>
                  <div className="bar-bg">
                    <div className="bar-fill" style={{ width: pct + "%" }} />
                  </div>
                  <span className="bar-count">{counts[star] || 0}</span>
                </div>
              );
            })}
          </div>
          <div className="summary-stats">
            <div className="avg">{average.toFixed(1)}</div>
            <div className="avg-stars">
              {Array.from({ length: Math.round(average) }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <div className="total">{total} reviews</div>
          </div>
        </div>
      </section>

      {/* ───── Reviews list (design from second file) ───── */}
      <ul className="reviews-list">
        {list.map((r) => {
          const id = r?._id;
          const username =
            r?.user?.name || r?.userName || r?.author || "Anonymous";
          const avatarUrl = r?.user?.profile || r?.avatar || null;
          const comment =
            r?.comment ?? r?.reviewComment ?? r?.text ?? r?.review ?? "";
          const rating = Number(r?.rating) || 0;
          const created = r?.createdAt || r?.date || null;

          // photos: either r.images (array) or r.image (single)
          const photos = Array.isArray(r?.images)
            ? r.images
            : r?.image
            ? [r.image]
            : [];

          return (
            <li id={`review-${id}`} key={id} className="review-card">
              {/* user row */}
              <div className="user-row">
                {avatarUrl ? (
                  <img className="avatar-img" src={avatarUrl} alt="" />
                ) : (
                  <div className="avatar">{username.charAt(0)}</div>
                )}

                <div className="user-info">
                  <div className="name">{username}</div>
                  <div className="subinfo">
                    {/* if you have counts in API, replace the fallbacks below */}
                    {r?.user?.reviewsCount ?? "5 reviews"} ·{" "}
                    {r?.user?.photosCount ?? "3 photos"}
                  </div>
                </div>

                {/* menu */}
                <div className="menu-wrap">
                  <button
                    className="menu-btn"
                    aria-haspopup="menu"
                    aria-expanded={openMenuId === id}
                    onClick={() => toggleMenu(id)}
                  >
                    ⋮
                  </button>

                  {openMenuId === id && (
                    <div className="menu-dropdown" role="menu">
                      <button className="menu-item" onClick={() => onShare(r)}>
                        Share review
                      </button>
                      <button className="menu-item" onClick={() => onReport(r)}>
                        Report review
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* stars + time */}
              <div className="star-time">
                <div className="stars">
                  {Array.from({ length: Math.round(rating) }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <div className="time">
                  {created ? formatDate(created) : r?.timeAgo || ""}
                </div>
              </div>

              {/* comment */}
              {comment && (
                <p className="comment">
                  {comment}{" "}
                  {comment.length > 100 && <span className="more">More</span>}
                </p>
              )}

              {/* photos grid */}
              {photos.length > 0 && (
                <div className="photo-grid">
                  <div className="big">
                    <img src={photos[0]} alt="" />
                  </div>
                  <div className="small-col">
                    {photos.slice(1, 4).map((url, i) => (
                      <img key={i} src={url} alt="" />
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
        {!list.length && <li className="center">No reviews yet.</li>}
      </ul>
    </div>
  );
}
