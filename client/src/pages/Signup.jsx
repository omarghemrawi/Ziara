// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    businessName: "",
    email: "",
    password: "",
    confirm: "",
    business: ""
  });

  // holds our inline error messages
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirm: "",
    business: ""
  });

  const businessList = [
    { id: "shop",       label: "Shop" },
    { id: "restaurant", label: "Restaurant" },
    { id: "hotel",      label: "Hotel" },
    { id: "activity",   label: "Activity" },
  ];

  const navigate = useNavigate();

  // simple email regex
  const validEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // at least 6 chars and must include a digit
  const strongPassword = (pw) =>
    pw.length >= 6 && /\d/.test(pw);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // clear that field's error as soon as user types
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // email
    if (!validEmail(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    // password strength
    if (!strongPassword(form.password)) {
      newErrors.password =
        "Password must be ≥6 characters and include a number.";
    }

    // confirm match
    if (form.password !== form.confirm) {
      newErrors.confirm = "Passwords do not match.";
    }

    // spinner selection
    if (!form.business) {
      newErrors.business = "Please choose your business.";
    }

    setErrors(newErrors);

    // if any errors, stop
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // otherwise proceed
    navigate("/additional-info", { state: form });
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left: illustration */}
        <div className="signup-image">
          <img src="/image/intro.png" alt="Sign up illustration" />
        </div>

        {/* Right: form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          <label>
            Business Name
            <input
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="At least 6 characters & a number"
            />
          </label>
          {errors.password && <p className="error">{errors.password}</p>}

          <label>
            Confirm Password
            <input
              name="confirm"
              type="password"
              value={form.confirm}
              onChange={handleChange}
              required
              placeholder="Repeat your password"
            />
          </label>
          {errors.confirm && <p className="error">{errors.confirm}</p>}

          {/* Spinner */}
          <label className="business-label">
            Business
            <select
              name="business"
              value={form.business}
              onChange={handleChange}
              required
            >
              <option value="">Select your business</option>
              {businessList.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </label>
          {errors.business && <p className="error">{errors.business}</p>}

          <button type="submit" className="btn signup-submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
