// src/pages/Services.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SignupButton from "../components/SignupButton";
import { useTranslation } from "react-i18next";   // ✅ إضافة الترجمة
import "./Services.css";

/* Inline icons */
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

function BusinessCard({ icon, title, bullets }) {
  return (
    <div className="svc-card">
      <div className="svc-card-head">
        <div className="svc-icon"><Icon name={icon} /></div>
        <h3>{title}</h3>
      </div>
      <ul className="svc-list">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}

function Price({ amount }) {
  return (
    <div className="price">
      <span className="currency">$</span>
      <span className="amount">{amount}</span>
      <span className="unit"> USD / month</span>
    </div>
  );
}

function PlanCard({ variant, name, price, subtitle, features, badge }) {
  return (
    <div className={`plan-card v-${variant}`}>
      {badge && <span className="plan-popular">{badge}</span>}
      <Price amount={price} />
      <h4 className="plan-title">{name}</h4>
      {subtitle && <p className="plan-sub">{subtitle}</p>}
      <ul className="svc-list plan-list">
        {features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
    </div>
  );
}

export default function Services() {
  const navigate = useNavigate();
  const { t } = useTranslation();  // ✅ hook الترجمة

  const goContact = () => navigate("/contact");

  const businesses = [
    {
      icon: "restaurant",
      title: t("services.businesses.restaurants.title"),
      bullets: [
        t("services.businesses.restaurants.item1"),
        t("services.businesses.restaurants.item2"),
        t("services.businesses.restaurants.item3"),
      ],
    },
    {
      icon: "hotel",
      title: t("services.businesses.hotels.title"),
      bullets: [
        t("services.businesses.hotels.item1"),
        t("services.businesses.hotels.item2"),
        t("services.businesses.hotels.item3"),
      ],
    },
    {
      icon: "activities",
      title: t("services.businesses.activities.title"),
      bullets: [
        t("services.businesses.activities.item1"),
        t("services.businesses.activities.item2"),
        t("services.businesses.activities.item3"),
      ],
    },
    {
      icon: "shop",
      title: t("services.businesses.shops.title"),
      bullets: [
        t("services.businesses.shops.item1"),
        t("services.businesses.shops.item2"),
        t("services.businesses.shops.item3"),
      ],
    },
  ];

  return (
    <div className="services-page">
      {/* Hero banner */}
      <section className="page-hero svc-hero">
        <span className="kicker">{t("services.hero.kicker")}</span>
        <h1>{t("services.hero.title")}</h1>
        <p>{t("services.hero.subtitle")}</p>
      </section>

      {/* Four business types */}
      <section className="svc-section">
        <h2 className="svc-title">{t("services.who.title")}</h2>
        <div className="svc-grid">
          {businesses.map((b) => (
            <BusinessCard key={b.title} icon={b.icon} title={b.title} bullets={b.bullets} />
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="svc-section">
        <h2 className="svc-title">{t("services.plans.title")}</h2>
        <p className="svc-sub">{t("services.plans.subtitle")}</p>

        <div className="plans-grid">
          <PlanCard
            variant="standard"
            name={t("services.plans.standard.name")}
            price={10}
            subtitle={t("services.plans.standard.subtitle")}
            features={[
              t("services.plans.standard.item1"),
              t("services.plans.standard.item2"),
              t("services.plans.standard.item3"),
            ]}
          />
          <PlanCard
            variant="plus"
            name={t("services.plans.plus.name")}
            price={20}
            subtitle={t("services.plans.plus.subtitle")}
            badge={t("services.plans.plus.badge")}
            features={[
              t("services.plans.plus.item1"),
              t("services.plans.plus.item2"),
              t("services.plans.plus.item3"),
            ]}
          />
          <PlanCard
            variant="pro"
            name={t("services.plans.pro.name")}
            price={50}
            subtitle={t("services.plans.pro.subtitle")}
            features={[
              t("services.plans.pro.item1"),
              t("services.plans.pro.item2"),
              t("services.plans.pro.item3"),
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="svc-cta-final">
        <h3>{t("services.cta.title")}</h3>
        <p className="svc-sub">{t("services.cta.subtitle")}</p>
        <div className="cta-actions">
          <SignupButton />
          <div
            className="btn-pill btn-pill--outline"
            aria-disabled="true"
            onClick={goContact}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goContact()}
          >
            {t("services.cta.contact")}
          </div>
        </div>
      </section>
    </div>
  );
}
