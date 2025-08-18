import React from "react";
import { useNavigate } from "react-router-dom";
import SignupButton from "../components/SignupButton";
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
      {/* No links */}
    </div>
  );
}

/* Pricing pieces (no buttons/links) */
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
  const goContact = () => navigate("/contact"); // غيّر المسار إذا بدّك
  const businesses = [
    {
      icon: "restaurant",
      title: "Restaurants",
      bullets: [
        "Menu link + photos of dishes (up to your plan limit).",
        "Opening hours, delivery/pick-up info, and location map.",
        "Customers can rate & write reviews; you can reply.",
      ],
    },
    {
      icon: "hotel",
      title: "Hotels",
      bullets: [
        "Show room types, amenities, and highlights.",
        "Add gallery and pin your exact location.",
        "Attach external booking link if you have one.",
      ],
    },
    {
      icon: "activities",
      title: "Activities & Places",
      bullets: [
        "Tours, attractions, museums, landmarks describe what guests will find.",
        "Add timing, ticket info (if any), and must-see photos.",
        "Visitors can favorite, rate, and leave feedback.",
      ],
    },
    {
      icon: "shop",
      title: "Shops",
      bullets: [
        "Showcase best items with short descriptions.",
        "Add price range and contact details.",
        "Links to social profiles & website.",
      ],
    },
  ];

  return (
    <div className="services-page">
      {/* Hero banner */}
      <section className="page-hero svc-hero">
        <span className="kicker">SERVICES</span>
        <h1>Discover Lebanon, together.</h1>
        <p>Choose a plan and list your business — Restaurants, Hotels, Activities & Places, and Shops.</p>
      </section>

      {/* Four business types */}
      <section className="svc-section">
        <h2 className="svc-title">Who we serve</h2>
        <div className="svc-grid">
          {businesses.map((b) => (
            <BusinessCard key={b.title} icon={b.icon} title={b.title} bullets={b.bullets} />
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="svc-section">
        <h2 className="svc-title">Plans</h2>
        <p className="svc-sub">Pick a plan that fits your needs. You can upgrade anytime.</p>

        <div className="plans-grid">
          <PlanCard
            variant="standard"
            name="Standard"
            price={10}
            subtitle="For everyday listing"
            features={[
              "Active subscription",
              "Image limit: 5",
              "Normal search ranking",
            ]}
          />
          <PlanCard
            variant="plus"
            name="Plus"
            price={20}
            subtitle="More access to advanced ranking"
            badge="POPULAR"
            features={[
              "Active subscription",
              "Image limit: 10",
              "Random Boost in search (occasionally top)",
            ]}
          />
          <PlanCard
            variant="pro"
            name="Advanced"
            price={50}
            subtitle="Full access to top ranking"
            features={[
              "Active subscription",
              "Unlimited images",
              "Top Rank (always)",
            ]}
          />
        </div>
      </section>

      {/* CTA (non-clickable; no links) */}
      <section className="svc-cta-final">
        <h3>Ready to grow with Ziara?</h3>
        <p className="svc-sub">Create an account or reach out to our team anytime.</p>
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
            Contact Us
          </div>
        </div>
      </section>
    </div>
  );
}
