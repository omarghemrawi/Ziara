// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Navbar.css";

export default function Navbar() {
  const [lang, setLang] = useState("EN");
  const { pathname, state } = useLocation(); // ← added `state`
  const dispatch =useDispatch()
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleLang = () => {
    const next = lang === "EN" ? "ع" : "EN";
    setLang(next);
    document.documentElement.lang = next === "EN" ? "en" : "ar";
    document.documentElement.dir = next === "EN" ? "ltr" : "rtl";
  };

  const handleLogout = () => {
  // Clear Redux state
  dispatch({ type: "CLEAR_USER" });

  // Clear localStorage
  localStorage.removeItem("user");

  // Navigate back to home
  navigate("/");
};

  // ───────── تحديد نوع الصفحة الحالية ─────────
  const isReviewPage = pathname.startsWith("/reviews");

  return (
    <nav className="navbar">
      <div className="container">

        {/* — Logo + Site Name */}
        <div className="navbar__logo">
          <img
            src="/image/navbar__logo.png"
            alt="Ziara logo"
            className="logo-img"
          />
          <span className="logo-text">Ziara</span>
        </div>

        {/* — Navigation Links */}
        <ul className="navbar__links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/#about">About</Link></li>
          <li><Link to="/#services">Services</Link></li>
          <li><Link to="/#contact">Contact</Link></li>
        </ul>

        {/* — Actions: Profile / Logout / Auth / Language */}
        <div className="navbar__actions">
          {user ? (
            // فقط في صفحة البروفايل: عرض زر تسجيل الخروج
            <><button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
               <Link to="/profile" className="btn-profile">
      Profile
    </Link>
            </>
            
          ) :(
            // باقي الصفحات: عرض Login + Sign Up
            <>
              <Link to="/login" className="btn login">Login</Link>
              <Link to="/signup" className="btn signup">Sign Up</Link>
            </>
          )}

          {/* — Language toggle: دائمًا ظاهر */}
          <button className="language-switch" onClick={toggleLang}>
            {lang} <span>▼</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
