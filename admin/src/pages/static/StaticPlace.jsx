import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StaticPlace.css";
const API_URL = import.meta.env.VITE_API_URL;

const StaticPlace = () => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  const API_URL = `${API_URL}/api/static`;
  const token = localStorage.getItem("adminToken")

  // Fetch all static places from backend
  const fetchPlaces = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setPlaces(response.data.places);
      } else {
        console.log("Failed to fetch places");
      }
    } catch (error) {
      console.log(error, "Network error. Please try again");
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  // Navigate to edit page with place data
  const handleEdit = (place) => {
    navigate(`/editStaticPlace/${place._id}`, { state: { place } });
  };

  // Delete a static place by ID
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this place?")) {
      try {
        const response = await axios.delete(`${API_URL}/${id}`,
  {
    headers: { Authorization: `Bearer ${token}` }, // token for auth
  });
        if (response.data.success) {
          setPlaces((prev) => prev.filter((p) => p._id !== id));
          alert("Place deleted successfully!");
        } else {
          alert("Failed to delete place");
        }
      } catch (error) {
        alert("Network error. Please try again.");
        console.log(error);
      }
    }
  };

  // Render the UI
  return (
    <div className="static-place-container">
      <h2>Static Places Management</h2>
      <button
        style={{
          marginBottom: "24px",
          padding: "12px 18px",
          background: "linear-gradient(90deg, #6366f1 60%, #60a5fa 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          transition: "background 0.2s, box-shadow 0.2s",
          marginLeft: "12%",
        }}
        onClick={() => navigate("/addStaticPlace")}
      >
        Add New Place
      </button>

      {places.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>
          No places found. Add your first place!
        </div>
      ) : (
        <div className="static-place-list">
          {places.map((place) => (
            <div key={place._id} className="static-place-card">
              <div className="static-place-card-content">
                <p>
                  {place.profile ? (
                    <img
                      src={place.profile}
                      alt={place.name}
                      style={{ maxWidth: "150px", maxHeight: "100px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </p>
                <h3>{place.name}</h3>
                <p>
                  <strong>Type:</strong> {place.type}
                </p>
                <p>
                  <strong>City:</strong> {place.city}
                </p>
                <p>
                  <strong>Rate:</strong> {place.rate}/5
                </p>
              </div>
              <div className="static-place-card-actions">
                <button onClick={() => handleEdit(place)}>Edit</button>
                <button onClick={() => handleDelete(place._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaticPlace;
