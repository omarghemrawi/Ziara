// src/pages/plan/Plan.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userActions";   // ⚡ استدعاء الأكشن
import "./Plan.css";

const plans = [
  { id: "standard", name: "Standard", price: 10, period: "USD / month",
    features: ["Active subscription","Image limit: 5","Normal search ranking"], cta: "Get Standard" },
  { id: "plus", name: "Plus", price: 20, period: "USD / month",
    features: ["Active subscription","Image limit: 10","Random Boost in search (occasionally top)"],
    tag: "POPULAR", highlighted: true, cta: "Get Plus" },
  { id: "pro", name: "Pro", price: 50, period: "USD / month",
    features: ["Active subscription","Unlimited images","Top Rank (always)"], cta: "Get Pro" },
];

const normalizePlan = (p) => {
  if (!p) return "";
  const s = String(p).toLowerCase();
  if (s.includes("standard") || s === "basic" || s === "std") return "standard";
  if (s.includes("plus") || s.includes("intermediate")) return "plus";
  if (s.includes("pro") || s.includes("advanced")) return "pro";
  return s;
};

const getSavedUser = () => {
  try { const raw = localStorage.getItem("userData"); return raw ? JSON.parse(raw) : null; }
  catch { return null; }
};

const sniffPlan = (u) => {
  if (!u) return "";
  if (u.plan?.name) return normalizePlan(u.plan.name);  // ✅ جاي من backend مباشرة
  return "";
};


export default function Plan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();   // ⚡ استخدام الديسباتش

  const reduxUser = useSelector((s) => s?.user?.userData ?? s?.user ?? null);
  const currentPlan = useMemo(() => {
    const a = sniffPlan(reduxUser);
    if (a) return a;
    return sniffPlan(getSavedUser());
  }, [reduxUser]);

  const goCheckout = (planId) => {
    const normalized = normalizePlan(planId);
    if (normalized === currentPlan) return;

    const user = getSavedUser() || {};
    const updatedUser = {
      ...user,
      subscription: { ...(user.subscription || {}), plan: normalized },
    };
    localStorage.setItem("userData", JSON.stringify(updatedUser));

    dispatch(setUser(updatedUser));   // ⚡ تحديث الريدوكس

    navigate(`/plan/checkout/${planId}`);
  };

  return (
    <div className="pricing-wrap">
      <h1 className="pricing-title">Upgrade your plan</h1>

      <div className="pricing-cards">
        {plans.map((p) => {
          const isCurrent = normalizePlan(p.id) === currentPlan;
          const cardClass = `card ${p.highlighted ? "card--highlight" : ""} card--${p.id}`;

          return (
            <div key={p.id} className={cardClass}>
              {p.tag && <div className="card-tag">{p.tag}</div>}
              {isCurrent && <div className="card-tag card-tag--current">Current</div>}

              <div className="card-price">
                <span className="currency">$</span>
                <span className="amount">{p.price}</span>
                <span className="per"> {p.period}</span>
              </div>

              <h3 className="card-title">{p.name}</h3>

              <p className="card-subtitle">
                {p.id === "standard" ? "For everyday listing"
                 : p.id === "plus" ? "More access to advanced ranking"
                 : "Full access to top ranking"}
              </p>

              <button
                className={`card-cta ${isCurrent ? "is-current" : ""}`}
                onClick={() => goCheckout(p.id)}
                disabled={isCurrent}
                aria-disabled={isCurrent}
                title={isCurrent ? "This is your current plan" : undefined}
              >
                {isCurrent ? "Current plan" : p.cta}
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
