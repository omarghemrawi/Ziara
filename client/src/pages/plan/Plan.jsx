import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userActions";
import { useTranslation } from "react-i18next"; // 👈 Added
import "./Plan.css";

const plansBase = (t) => [
  {
    id: "standard",
    name: t("plan.standard.name"),
    price: 10,
    period: t("plan.period"),
    features: [
      t("plan.features.active"),
      t("plan.features.limit5"),
      t("plan.features.normalRank")
    ],
    cta: t("plan.standard.cta"),
    subtitle: t("plan.standard.subtitle")
  },
  {
    id: "plus",
    name: t("plan.plus.name"),
    price: 20,
    period: t("plan.period"),
    features: [
      t("plan.features.active"),
      t("plan.features.limit10"),
      t("plan.features.boost")
    ],
    tag: t("plan.plus.tag"),
    highlighted: true,
    cta: t("plan.plus.cta"),
    subtitle: t("plan.plus.subtitle")
  },
  {
    id: "pro",
    name: t("plan.pro.name"),
    price: 50,
    period: t("plan.period"),
    features: [
      t("plan.features.active"),
      t("plan.features.unlimited"),
      t("plan.features.topRank")
    ],
    cta: t("plan.pro.cta"),
    subtitle: t("plan.pro.subtitle")
  }
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
  try {
    const raw = localStorage.getItem("userData");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const sniffPlan = (u) => {
  if (!u) return "";
  if (u.plan?.name) return normalizePlan(u.plan.name);
  return "";
};

export default function Plan() {
  const { t } = useTranslation(); // 👈 Added
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    dispatch(setUser(updatedUser));
    navigate(`/plan/checkout/${planId}`);
  };

  const plans = plansBase(t); // 👈 build plans with translations

  return (
    <div className="pricing-wrap">
      <h1 className="pricing-title">{t("plan.upgradeTitle")}</h1>

      <div className="pricing-cards">
        {plans.map((p) => {
          const isCurrent = normalizePlan(p.id) === currentPlan;
          const cardClass = `card ${p.highlighted ? "card--highlight" : ""} card--${p.id}`;

          return (
            <div key={p.id} className={cardClass}>
              {p.tag && <div className="card-tag">{p.tag}</div>}
              {isCurrent && <div className="card-tag card-tag--current">{t("plan.current")}</div>}

              <div className="card-price">
                <span className="currency">$</span>
                <span className="amount">{p.price}</span>
                <span className="per">{p.period}</span>
              </div>

              <h3 className="card-title">{p.name}</h3>
              <p className="card-subtitle">{p.subtitle}</p>

              <button
                className={`card-cta ${isCurrent ? "is-current" : ""}`}
                onClick={() => goCheckout(p.id)}
                disabled={isCurrent}
                aria-disabled={isCurrent}
                title={isCurrent ? t("plan.thisCurrent") : undefined}
              >
                {isCurrent ? t("plan.currentPlan") : p.cta}
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
