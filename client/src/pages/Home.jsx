// src/pages/home/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel"; 
import SignupButton from "../components/SignupButton";
import "./Home.css";

/* inline icons */
function Icon({ name, size = 28 }) {
  const common = { width: size, height: size, "aria-hidden": true };
  switch (name) {
    case "restaurant":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M6 3v9a2 2 0 0 1-2 2v7h2v-7h2v7h2v-7a2 2 0 0 1-2-2V3H6zm10 0a4 4 0 0 1 4 4v7h-2v9h-2v-9h-2V7a4 4 0 0 1 4-4z" fill="currentColor"/>
        </svg>
      );
    case "hotel":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M4 21V3h10v6h6v12h-2v-6H6v6H4zm2-8h12V9h-4V5H6v8z" fill="currentColor"/>
        </svg>
      );
    case "activities":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 2l2.39 4.84L20 8l-4 3.9.95 5.53L12 15.77 7.05 17.43 8 11.9 4 8l5.61-1.16L12 2z" fill="currentColor"/>
        </svg>
      );
    case "shop":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M4 7h16l-1.5 12.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 7zm1-4h14v2H5V3z" fill="currentColor"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  const navigate = useNavigate();

  // Navigate functions
  const goServices = () => navigate("/services");

  const goPlans = () => navigate("/services");
  const goAbout = () => navigate("/about");
  const goContact = () => navigate("/contact");

  // Reusable button component
  const NavButton = ({ onClick, children, className }) => (
    <div
      className={className}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      {children}
    </div>
  );

  return (
    <div className="home">
      {/* 1) HERO FIRST */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <span className="home-kicker">WELCOME TO ZIARA</span>
          <h1>Discover Lebanon, together.</h1>
          <p>
            Ziara connects visitors with local <strong>restaurants</strong>, <strong>stays</strong>,{" "}
            <strong>activities & places</strong>, and <strong>shops</strong>—through a simple,
            bilingual experience across web and mobile.
          </p>
          <div className="home-hero-ctas">
            <NavButton className="btn-pill btn-brown" onClick={goServices}>
              Explore services
            </NavButton>
            <SignupButton />
          </div>
        </div>
      </section>

      {/* 2) CAROUSEL AFTER HERO */}
      <section className="home-carousel">
        <Carousel />
      </section>

      {/* 3) Explore by category */}
      <section className="home-section">
        <div className="home-heading">
          <h2>Explore by category</h2>
          <span className="accent-line" />
        </div>

        <div className="home-grid-4">
          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="restaurant" /></div>
              <h3>Restaurants</h3>
            </div>
            <ul className="home-list">
              <li>Menu link + photos</li>
              <li>Hours, delivery & map</li>
              <li>Ratings and reviews</li>
            </ul>
          </div>

          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="hotel" /></div>
              <h3>Hotels</h3>
            </div>
            <ul className="home-list">
              <li>Rooms & amenities</li>
              <li>Gallery + exact location</li>
              <li>External booking link</li>
            </ul>
          </div>

          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="activities" /></div>
              <h3>Activities & Places</h3>
            </div>
            <ul className="home-list">
              <li>Tours & attractions</li>
              <li>Timing & ticket info</li>
              <li>Must-see photos</li>
            </ul>
          </div>

          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="shop" /></div>
              <h3>Shops</h3>
            </div>
            <ul className="home-list">
              <li>Showcase items</li>
              <li>Price range + contacts</li>
              <li>Social links & website</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4) Why Ziara */}
      <section className="home-section">
        <div className="home-heading">
          <h2>Why Ziara?</h2>
          <span className="accent-line" />
        </div>

        <div className="home-grid-3">
          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="restaurant" /></div>
              <h3>Bilingual by default</h3>
            </div>
            <p className="muted">Arabic/English UI with instant LTR/RTL switch.</p>
          </div>

          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="restaurant" /></div>
              <h3>Smart ranking</h3>
            </div>
            <p className="muted">Plans boost visibility so the right visitors find you.</p>
          </div>

          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="restaurant" /></div>
              <h3>Rich reviews</h3>
            </div>
            <p className="muted">Photo reviews with owner replies keep listings fresh.</p>
          </div>
        </div>
      </section>

      {/* 5) Final CTA */}
      <section className="home-cta-final">
        <h3>Ready to get started?</h3>
        <div className="cta-actions">
          <NavButton className="btn-pill btn-brown" onClick={goPlans}>
            See plans
          </NavButton>
          <NavButton className="btn-pill btn-gold" onClick={goAbout}>
            About Us
          </NavButton>
          <NavButton className="btn-pill btn-pill--outline" onClick={goContact}>
            Contact Us
          </NavButton>
        </div>
      </section>
    </div>
  );
}
