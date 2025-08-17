import React, { useEffect, useState } from "react";
import axios from "axios";
import "./review.css"; // custom styles

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:5000/api/review", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data.reviews || []);
      setFilteredReviews(res.data.reviews || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };
  
  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle delete review
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/review/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedReviews = reviews.filter((rev) => rev._id !== reviewId);
      setReviews(updatedReviews);
      setFilteredReviews(updatedReviews);
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  // Handle filter by username
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = reviews.filter((rev) =>
      rev.userId?.username.toLowerCase().includes(term)
    );
    setFilteredReviews(filtered);
  };

  return (
    <div className="review-page">
      <h1 className="review-title">Manage Reviews</h1>

      <div className="review-toolbar">
        <input
          type="text"
          placeholder="Filter by User..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="review-table">
        {/* Desktop/Tablet Table View */}
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Place</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Image</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((rev) => (
                <tr key={rev._id}>
                  <td>{rev.userId?.username}</td>
                  <td>{rev.placeId?.name}</td>
                  <td>⭐ {rev.rating}</td>
                  <td>{rev.comment}</td>
                  <td>
                    {rev.image && (
                      <img src={rev.image} alt="review" className="review-img" />
                    )}
                  </td>
                  <td>{new Date(rev.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(rev._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="review-cards">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((rev) => (
              <div key={`card-${rev._id}`} className="review-card">
                <div className="review-card-header">
                  <span className="review-card-user">{rev.userId?.username}</span>
                  <span className="review-card-rating">⭐ {rev.rating}</span>
                </div>
                
                <div className="review-card-content">
                  <div className="review-card-place">{rev.placeId?.name}</div>
                  <div className="review-card-comment">{rev.comment}</div>
                  
                  {rev.image && (
                    <img src={rev.image} alt="review" className="review-card-image" />
                  )}
                </div>
                
                <div className="review-card-footer">
                  <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(rev._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
              No reviews found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;