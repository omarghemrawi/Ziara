// src/components/SignupButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";   // ✅ إضافة الترجمة

export default function SignupButton({ className = "btn-pill btn-gold" }) {
  const navigate = useNavigate();
  const { t } = useTranslation();   // ✅ hook الترجمة

  const user = (() => {
    try {
      const raw = localStorage.getItem("userData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const goSignup = () => navigate("/signup");
  const goProfile = () => navigate("/profile");

  // إذا ما في user → زر Create account
  if (!user) {
    return (
      <div
        className={className}
        role="button"
        tabIndex={0}
        onClick={goSignup}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goSignup()}
      >
        {t("signupButton.create")}
      </div>
    );
  }

  // إذا في user → زر Go to Profile
  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      onClick={goProfile}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goProfile()}
    >
      {t("signupButton.profile")}
    </div>
  );
}
