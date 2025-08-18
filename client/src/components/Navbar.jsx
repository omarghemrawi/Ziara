import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Navbar.css";

export default function Navbar() {
  const [lang, setLang] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isActive = (p) =>
    p === "/" ? pathname === "/" : pathname.startsWith(p);

  const user = (() => {
    try {
      const raw = localStorage.getItem("userData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const toggleLang = () => {
    const next = lang === "EN" ? "ع" : "EN";
    setLang(next);
    document.documentElement.lang = next === "EN" ? "en" : "ar";
    document.documentElement.dir = next === "EN" ? "ltr" : "rtl";
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
          <img
            src="/image/navbar__logo.png"
            alt="Ziara logo"
            className="logo-img"
          />
          <span className="logo-text">Ziara</span>
        </div>

        {/* Hamburger icon (mobile only) */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <ul className={`navbar__links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className={isActive("/") ? "active" : undefined}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={isActive("/about") ? "active" : undefined}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={isActive("/services") ? "active" : undefined}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={isActive("/contact") ? "active" : undefined}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          {user ? (
            <>
              <Link to="/profile" className="btn-profile">
                Profile
              </Link>
              <button className="btn logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn login">
                Login
              </Link>
              <Link to="/signup" className="btn signup">
                Sign Up
              </Link>
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
