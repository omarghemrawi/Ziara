import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/userActions";
import { useTranslation } from "react-i18next"; // 👈 Added
import "./Checkout.css";
const API_URL = process.env.REACT_APP_API_URL;

const PLANS = {
  standard: { id: "standard", name: "Standard", price: 10 },
  plus: { id: "plus", name: "Plus", price: 20 },
  pro: { id: "pro", name: "Pro", price: 50 },
};

export default function Checkout() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { t } = useTranslation(); // 👈 Added

  const plan = useMemo(() => PLANS[planId] ?? null, [planId]);

  const [form, setForm] = useState({
    email: "",
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  if (!plan) {
    navigate("/plan");
    return null;
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (name === "number")
      v = v.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);
    if (name === "expiry")
      v = v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);
    if (name === "cvc") v = v.replace(/\D/g, "").slice(0, 4);
    setForm((p) => ({ ...p, [name]: v }));
  };

  const payNow = async (plan) => {
    try {
      const response = await axios.put(
        `${API_URL}
/api/client/subscribe`,
        { planName: plan.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate("/profile", { replace: true });
      } else {
        alert(`${t("checkout.failed")}: ${response.data.message}`);
      }
    } catch (err) {
      alert(`${t("checkout.paymentFailed")}: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="checkout-wrap">
      <div className="checkout-grid">
        {/* Summary */}
        <div className="summary">
          <div className="logo">Ziara</div>
          <h2 className="summary-title">
            {t("checkout.subscribeTo", { plan: plan.name })}
          </h2>
          <div className="summary-price">
            <span className="s-currency">$</span>
            <span className="s-amount">{plan.price}</span>
            <span className="s-per">/ {t("checkout.month")}</span>
          </div>

          <div className="summary-box">
            <div className="row">
              <span>{t("checkout.subtotal")}</span>
              <span>${plan.price.toFixed(2)}</span>
            </div>
            <div className="row">
              <span>{t("checkout.tax")}</span>
              <span>$0.00</span>
            </div>
            <div className="row row-total">
              <span>{t("checkout.total")}</span>
              <span>${plan.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment form */}
        <div className="form">
          <h3 className="form-title">{t("checkout.contactInfo")}</h3>
          <div className="field">
            <input
              type="email"
              name="email"
              placeholder={t("checkout.email")}
              value={form.email}
              onChange={onChange}
              required
            />
          </div>

          <h3 className="form-title">{t("checkout.paymentMethod")}</h3>
          <div className="field-row">
            <input
              type="text"
              name="number"
              placeholder={t("checkout.cardNumber")}
              value={form.number}
              onChange={onChange}
              inputMode="numeric"
              required
            />
            <input
              type="text"
              name="expiry"
              placeholder={t("checkout.expiry")}
              value={form.expiry}
              onChange={onChange}
              inputMode="numeric"
              required
            />
            <input
              type="text"
              name="cvc"
              placeholder={t("checkout.cvc")}
              value={form.cvc}
              onChange={onChange}
              inputMode="numeric"
              required
            />
          </div>

          <div className="field">
            <input
              type="text"
              name="name"
              placeholder={t("checkout.cardName")}
              value={form.name}
              onChange={onChange}
              required
            />
          </div>

          <button className="pay-btn" onClick={() => payNow(plan)}>
            {t("checkout.payNow", { price: plan.price })}
          </button>

          <p className="fine">{t("checkout.agreement")}</p>
        </div>
      </div>
    </div>
  );
}
