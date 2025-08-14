// src/pages/plan/Plan.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Plan.css";

const plans = [
  {
    id: "standard",
    name: "Standard",
    price: 10,
    period: "USD / month",
    features: ["Active subscription", "Image limit: 5", "Normal search ranking"],
    cta: "Get Standard",
  },
  {
    id: "plus",
    name: "Plus",
    price: 20,
    period: "USD / month",
    features: [
      "Active subscription",
      "Image limit: 10",
      "Random Boost in search (occasionally top)",
    ],
    tag: "POPULAR",
    highlighted: true,
    cta: "Get Plus",
  },
  {
    id: "pro",
    name: "Pro",
    price: 50,
    period: "USD / month",
    features: ["Active subscription", "Unlimited images", "Top Rank (always)"],
    cta: "Get Pro",
  },
];

export default function Plan() {
  const navigate = useNavigate();
  const goCheckout = (planId) => navigate(`/plan/checkout/${planId}`);

  return (
    <div className="pricing-wrap">
      <h1 className="pricing-title">Upgrade your plan</h1>
<div className="pricing-cards">
  {plans.map((p) => {
    const cardClass = `card ${p.highlighted ? "card--highlight" : ""} card--${p.id}`;
    return (
      <div key={p.id} className={cardClass}>
        {p.tag && <div className="card-tag">{p.tag}</div>}

        <div className="card-price">
          <span className="currency">$</span>
          <span className="amount">{p.price}</span>
          <span className="per"> {p.period}</span>
        </div>

        <h3 className="card-title">{p.name}</h3>

        <p className="card-subtitle">
          {p.id === "standard"
            ? "For everyday listing"
            : p.id === "plus"
            ? "More access to advanced ranking"
            : "Full access to top ranking"}
        </p>

        <button className="card-cta" onClick={() => goCheckout(p.id)}>
          {p.cta}
        </button>

        <ul className="card-features">
          {p.features.map((f, i) => (
            <li key={i} className="feature-item">• {f}</li>
          ))}
        </ul>
      </div>
    );
  })}
</div>

    </div>
  );
}