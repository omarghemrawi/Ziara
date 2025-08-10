// src/pages/AdditionalInfo.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./AdditionalInfo.css";


export default function AdditionalInfo() {
  // بيانات صفحة التسجيل
  const { state: signupData } = useLocation();
  const navigate = useNavigate();

  // إضافة حقل errors لمسك رسائل الخطأ
  const [info, setInfo] = useState({
    city: "",
    phone: ""
  });
  const [errors, setErrors] = useState({
    city: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
    // مسح رسالة الخطأ عند الكتابة
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // City required (يمكنك إضافة تحقق مشابه إذا أردت)
    if (!info.city.trim()) {
      newErrors.city = "Please enter your city.";
    }

    // Phone: على الأقل 8 أحرف (تعديل حسب الحاجة)
    if (info.phone.trim().length < 8) {
      newErrors.phone = "Please enter a valid phone number (min 8 chars).";
    }

    setErrors(newErrors);

    // إذا في أخطاء، ما نتابع
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // دمج البيانات ثم التنقل
    
    try {
    const response = await axios.post("http://localhost:5000/api/client/update-profile", info);

    console.log("Profile updated:", response.data);

    navigate("/profile", { state: info });
  } catch (error) {
    console.error("Profile update failed:", error.response?.data || error.message);
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

        <button type="submit" className="btn info-submit">
          Continue
        </button>
      </form>
    </div>
  );
}
