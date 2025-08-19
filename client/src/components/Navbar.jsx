// ✅ FINAL VERSION OF JSX for Navbar layout to match both English and Arabic perfectly

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isActive = (p) => (p === "/" ? pathname === "/" : pathname.startsWith(p));

  const user = (() => {
    try {
      const raw = localStorage.getItem("userData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const toggleLang = () => {
    const nextLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(nextLang);
    document.documentElement.lang = nextLang;
    document.documentElement.dir = nextLang === "ar" ? "rtl" : "ltr";
  };

  const handleLogout = () => {
    dispatch({ type: "CLEAR_USER" });
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}

        <div className="navbar__logo">
          <img src="/image/navbar__logo.png" alt="Ziara logo" className="logo-img" />
          <span className="logo-text">Ziara</span>
        </div>
                    {/* ✅ Menu toggle (hamburger) */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
         ☰
          </button>

<ul className={`navbar__links ${menuOpen ? "open" : ""}`}>
  <li>
    <Link to="/" className={isActive("/") ? "active" : ""}>
      {t("navbar.home")}
    </Link>
  </li>
  <li>
    <Link to="/about" className={isActive("/about") ? "active" : ""}>
      {t("navbar.about")}
    </Link>
  </li>
  <li>
    <Link to="/services" className={isActive("/services") ? "active" : ""}>
      {t("navbar.services")}
    </Link>
  </li>
  <li>
    <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
      {t("navbar.contact")}
    </Link>
  </li>
</ul>


        {/* Actions */}
        <div className="navbar__actions">
          {user ? (
            <>
              <Link to="/profile" className="btn-profile">{t("navbar.profile")}</Link>
              <button className="btn logout" onClick={handleLogout}>{t("navbar.logout")}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn login">{t("navbar.login")}</Link>
              <Link to="/signup" className="btn signup">{t("navbar.signup")}</Link>
            </>
          )}
          <button className="language-switch" onClick={toggleLang}>
            {i18n.language === "en" ? "EN" : "ع"} <span>▼</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
