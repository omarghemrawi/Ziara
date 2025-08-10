import React, { useEffect, useState } from "react";
 import { useParams, useLocation } from "react-router-dom";
import "./ReviewsPage.css";

export default function ReviewsPage() {
  const { placeId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const { state } = useLocation(); // ← فيك تلقط state.profile إذا بدك
 /* eslint-disable-next-line no-unused-vars */
 const profile = state?.profile; // مش إلزامي تستخدمه هون، بس رح ينسحب بالNavbar


  // ─────── M O C K   D A T A ─────────────────────────────────────────
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
    // …add more mocks if needed
  ];
  // ─────────────────────────────────────────────────────────────────────

  // compute summary
  const total = mockReviews.length;
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  mockReviews.forEach((r) => counts[r.rating]++);
  const average =
    mockReviews.reduce((sum, r) => sum + r.rating, 0) / total || 0;

  useEffect(() => {
    // real fetch (commented out)
    /*
    fetch(`/api/reviews/${placeId}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(console.error);
    */
    // use mock
    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 300);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeId]);

  if (loading) return <p className="center">Loading reviews…</p>;

  return (
    <div className="reviews-page">
      {/* 1) TITLE */}
      <h1 className="page-title">Rating & Review</h1>

      {/* 2) REVIEW SUMMARY */}
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
                    <div
                      className="bar-fill"
                      style={{ width: pct + "%" }}
                    ></div>
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

      {/* 3) INDIVIDUAL REVIEWS */}
      <ul className="reviews-list">
        {reviews.map((r) => (
          <li key={r._id} className="review-card">
            {/* user row */}
            <div className="user-row">
              <div className="avatar">{r.userName.charAt(0)}</div>
              <div className="user-info">
                <div className="name">{r.userName}</div>
                <div className="subinfo">
                  {r.userReviewCount} reviews · {r.userPhotoCount} photos
                </div>
              </div>
              <button className="menu-btn">⋮</button>
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
              {r.comment.length > 100 && (
                <span className="more">More</span>
              )}
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
