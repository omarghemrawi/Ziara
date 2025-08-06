// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [lang, setLang] = useState("EN");
  const { pathname } = useLocation();
  const navigate  = useNavigate();

  const toggleLang = () => {
    const next = lang === "EN" ? "ع" : "EN";
    setLang(next);
    document.documentElement.lang = next === "EN" ? "en" : "ar";
    document.documentElement.dir  = next === "EN" ? "ltr" : "rtl";
  };

  const handleLogout = () => {
    // TODO: clear any stored auth/session state here
    navigate("/"); // send them back home
  };

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

        {/* — Actions: Login / Sign Up / Logout / Language */}
        <div className="navbar__actions">
          {pathname === "/profile" ? (
            // On profile route: show only Logout
            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            // Everywhere else: Login + Sign Up
            <>
              <Link to="/login"  className="btn login">  Login  </Link>
              <Link to="/signup" className="btn signup"> Sign Up </Link>
            </>
          )}
          <button className="language-switch" onClick={toggleLang}>
            {lang} <span>▼</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
