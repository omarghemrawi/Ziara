// src/pages/AdditionalInfo.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./AdditionalInfo.css";

export default function AdditionalInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  // ⬇️ from Redux (your userReducer stores userData in localStorage too)
  const userData = useSelector((state) => state.user.userData);
  const userId = userData?._id;

  const [info, setInfo] = useState({ city: "", phone: "" });
  const [errors, setErrors] = useState({ city: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple validation
    const newErrors = {};
    if (!info.city.trim()) newErrors.city = "Please enter your city.";
    if (info.phone.trim().length < 8) newErrors.phone = "Please enter a valid phone number (min 8 chars).";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (!userId) {
      alert("User not found. Please sign up again.");
      navigate("/signup");
      return;
    }

    setSubmitting(true);
    try {
      // PUT + multipart/form-data (multer on backend)
      const form = new FormData();
      form.append("userId", userId);
      form.append("city", info.city);
      form.append("phone", info.phone);

        const { data } = await axios.put(
        "http://localhost:5000/api/client/update-profile",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

           // حدّث الريدكس بنسخة السيرفر (حتى Profile يشوف city فوراً)
      if (data?.user) {
        dispatch({ type: "SET_USER", payload: data.user });
      }

      // go to profile (you can also pass response data if needed)
      navigate("/profile", { state: { ...info, userId } });
    } catch (error) {
      console.error("Profile update failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="info-page">
      <form className="info-form" onSubmit={handleSubmit}>
        <h2>Tell Us More</h2>

        <label>
          City
          <input
            type="text"
            name="city"
            value={info.city}
            onChange={handleChange}
            placeholder="e.g. Beirut"
            required
          />
        </label>
        {errors.city && <p className="error">{errors.city}</p>}

        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            value={info.phone}
            onChange={handleChange}
            placeholder="+961-3-123456"
            required
          />
        </label>
        {errors.phone && <p className="error">{errors.phone}</p>}

        <button type="submit" className="btn info-submit" disabled={submitting}>
          {submitting ? "Saving..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
