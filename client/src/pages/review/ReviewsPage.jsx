import React, { useEffect, useState } from "react";
 import {useLocation } from "react-router-dom";
import "./ReviewsPage.css";

export default function ReviewsPage() {
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  // const [loading, setLoading] = useState(true);
  console.log(reviews)



  const total = reviews.length;
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    if (counts[r.rating] !== undefined) counts[r.rating]++;
  });

  const average =
    total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;


  useEffect(() => {
  setReviews(location.state)
  }, []);

  // if (loading) return <p className="center">Loading reviews…</p>;

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
            const pct = total ? Math.round((counts[star] / total) * 100) : 0;
            return (
              <div key={star} className="bar-row">
                <span className="bar-label">{star}⭐</span>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: pct + "%" }}></div>
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
              <div className="avatar"><img src={r.userId.profileImage} alt="" /></div>
              <div className="user-info">
                <div className="name">{r.userId.username}</div>
                <div className="subinfo">
                  5 reviews 
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
              <div className="time">  {new Date(r.createdAt).toLocaleDateString()}</div>
            </div>

            {/* comment */}
            <p className="comment">
              {r.comment}
              
            </p>

            {/* photos grid */}
            {r.image  && (
              <div className="photo-grid">
                <div className="big">
                  <img src={r.image} alt="" />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
