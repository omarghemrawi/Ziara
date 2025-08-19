// src/pages/home/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel"; 
import SignupButton from "../components/SignupButton";
import { useTranslation } from "react-i18next";   // ✅ Translation hook
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
  const { t } = useTranslation();   // ✅ Translation

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
          <span className="home-kicker">{t("home.hero.kicker")}</span>
          <h1>{t("home.hero.title")}</h1>
          <p>{t("home.hero.subtitle")}</p>
          <div className="home-hero-ctas">
            <NavButton className="btn-pill btn-brown" onClick={goServices}>
              {t("home.hero.explore")}
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
          <h2>{t("home.categories.title")}</h2>
          <span className="accent-line" />
        </div>

        <div className="home-grid-4">
          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="restaurant" /></div>
              <h3>{t("home.categories.restaurants.title")}</h3>
            </div>
            <ul className="home-list">
              <li>{t("home.categories.restaurants.item1")}</li>
              <li>{t("home.categories.restaurants.item2")}</li>
              <li>{t("home.categories.restaurants.item3")}</li>
            </ul>
          </div>

          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="hotel" /></div>
              <h3>{t("home.categories.hotels.title")}</h3>
            </div>
            <ul className="home-list">
              <li>{t("home.categories.hotels.item1")}</li>
              <li>{t("home.categories.hotels.item2")}</li>
              <li>{t("home.categories.hotels.item3")}</li>
            </ul>
          </div>

          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="activities" /></div>
              <h3>{t("home.categories.activities.title")}</h3>
            </div>
            <ul className="home-list">
              <li>{t("home.categories.activities.item1")}</li>
              <li>{t("home.categories.activities.item2")}</li>
              <li>{t("home.categories.activities.item3")}</li>
            </ul>
          </div>

          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="shop" /></div>
              <h3>{t("home.categories.shops.title")}</h3>
            </div>
            <ul className="home-list">
              <li>{t("home.categories.shops.item1")}</li>
              <li>{t("home.categories.shops.item2")}</li>
              <li>{t("home.categories.shops.item3")}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4) Why Ziara */}
      <section className="home-section">
        <div className="home-heading">
          <h2>{t("home.why.title")}</h2>
          <span className="accent-line" />
        </div>

        <div className="home-grid-3">
          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="restaurant" /></div>
              <h3>{t("home.why.bilingual.title")}</h3>
            </div>
            <p className="muted">{t("home.why.bilingual.desc")}</p>
          </div>

          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="restaurant" /></div>
              <h3>{t("home.why.ranking.title")}</h3>
            </div>
            <p className="muted">{t("home.why.ranking.desc")}</p>
          </div>

          <div className="home-card">
            <div className="home-card-head">
              <div className="home-icon"><Icon name="restaurant" /></div>
              <h3>{t("home.why.reviews.title")}</h3>
            </div>
            <p className="muted">{t("home.why.reviews.desc")}</p>
          </div>
        </div>
      </section>

      {/* 5) Final CTA */}
      <section className="home-cta-final">
        <h3>{t("home.final.title")}</h3>
        <div className="cta-actions">
          <NavButton className="btn-pill btn-brown" onClick={goPlans}>
            {t("home.final.plans")}
          </NavButton>
          <NavButton className="btn-pill btn-gold" onClick={goAbout}>
            {t("home.final.about")}
          </NavButton>
          <NavButton className="btn-pill btn-pill--outline" onClick={goContact}>
            {t("home.final.contact")}
          </NavButton>
        </div>
      </section>
    </div>
  );
}
