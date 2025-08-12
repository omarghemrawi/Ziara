import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ReviewsPage.css";

export default function ReviewsPage() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const onReport = (r) => {
    console.log("REPORT CLICK", r._id); // لازم تشوفها بالConsole
    setOpenMenuId(null);
    navigate("/report-review", {
      state: {
        reviewId: r._id,
        reviewerName: r.userName,
        reviewComment: r.comment,
      },
    });
  };

  // ───── Menu state (which review’s menu is open) ─────
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  // close when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      // إذا الكليك ما كان داخل أي عنصر عنده class="menu-wrap"
      if (!e.target.closest(".menu-wrap")) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Actions
  const onShare = async (r) => {
    setOpenMenuId(null);
    const title = `Review by ${r.userName}`;
    const text =
      r.comment.slice(0, 120) + (r.comment.length > 120 ? "…" : "");
    const url = window.location.href + `#review-${r._id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch (_) {
      /* user dismissed share sheet */
    }
  };

  // ─────── M O C K   D A T A ─────────────────────────
  const mockReviews = [
    {
      _id: "1",
      userName: "Mohamed",
      userReviewCount: 5,
      userPhotoCount: 3,
      rating: 5,
      timeAgo: "7 months ago",
      comment:
        "Amazing experience at Al Nabulsi, food was amazing, staff was amazing, service is top notch. I am visiting Lebanon from Canada and this is the best food I have ever had. If you are in Lebanon you must visit them in Saida!",
      photos: [
        "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        "https://res.cloudinary.com/demo/image/upload/balloons.jpg",
        "https://res.cloudinary.com/demo/image/upload/couple.jpg",
        "https://res.cloudinary.com/demo/image/upload/dog.jpg",
      ],
    },
    {
      _id: "2",
      userName: "Aya",
      userReviewCount: 2,
      userPhotoCount: 0,
      rating: 4,
      timeAgo: "3 months ago",
      comment:
        "Lovely place with great ambiance. The desserts were a bit sweet for my taste but overall very satisfied!",
      photos: [],
    },
  ];
  // ────────────────────────────────────────────────────

  const total = mockReviews.length;
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  mockReviews.forEach((r) => counts[r.rating]++);
  const average =
    mockReviews.reduce((sum, r) => sum + r.rating, 0) / total || 0;

  useEffect(() => {
    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 300);
  }, [placeId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <p className="center">Loading reviews…</p>;

  return (
    <div className="reviews-page">
      <h1 className="page-title">Rating & Review</h1>

      <section className="review-summary">
        <div className="summary-header">Review summary</div>
        <div className="summary-body">
          <div className="bars">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = Math.round((counts[star] / total) * 100);
              return (
                <div key={star} className="bar-row">
                  <span className="bar-label">{star}</span>
                  <div className="bar-bg">
                    <div className="bar-fill" style={{ width: pct + "%" }} />
                  </div>
                  <span className="bar-count">{counts[star]}</span>
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

      <ul className="reviews-list">
        {reviews.map((r) => (
          <li id={`review-${r._id}`} key={r._id} className="review-card">
            {/* user row */}
            <div className="user-row">
              <div className="avatar">{r.userName.charAt(0)}</div>
              <div className="user-info">
                <div className="name">{r.userName}</div>
                <div className="subinfo">
                  {r.userReviewCount} reviews · {r.userPhotoCount} photos
                </div>
              </div>

              {/* menu button + dropdown */}
              <div className="menu-wrap">
                <button
                  className="menu-btn"
                  aria-haspopup="menu"
                  aria-expanded={openMenuId === r._id}
                  onClick={() => toggleMenu(r._id)}
                >
                  ⋮
                </button>

                {openMenuId === r._id && (
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
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <div className="time">{r.timeAgo}</div>
            </div>

            {/* comment */}
            <p className="comment">
              {r.comment}{" "}
              {r.comment.length > 100 && <span className="more">More</span>}
            </p>

            {/* photos grid */}
            {r.photos.length > 0 && (
              <div className="photo-grid">
                <div className="big">
                  <img src={r.photos[0]} alt="" />
                </div>
                <div className="small-col">
                  {r.photos.slice(1, 4).map((url, i) => (
                    <img key={i} src={url} alt="" />
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
