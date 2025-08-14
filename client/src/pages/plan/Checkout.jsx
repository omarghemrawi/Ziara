// src/pages/plan/Checkout.jsx
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { subscribePlan } from "../../redux/subscriptionActions";

import "./Checkout.css";



const PLANS = {
  standard: { id: "standard", name: "Standard", price: 10 },
  plus: { id: "plus", name: "Plus", price: 20 },
  pro: { id: "pro", name: "Pro", price: 50 },
};

export default function Checkout() {
  const { planId } = useParams();
  const navigate = useNavigate();

const dispatch = useDispatch();
const loading = useSelector((s) => s.subscription.loading);
  const plan = useMemo(() => PLANS[planId] ?? null, [planId]);

  // فقط الحقول الضرورية للدفع
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

const payNow = async () => {
  const required = ["email", "number", "expiry", "cvc", "name"];
  if (!required.every((k) => String(form[k] || "").trim())) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    // await dispatch(subscribePlan(plan.id)); // يعمل POST + refresh /me
    alert(`Subscribed to ${plan.name} — $${plan.price}/month`);
    navigate("/");
  } catch {
    // لو بدك، فيك تعرض توست هون
  }
};


  return (
    <div className="checkout-wrap">
      <div className="checkout-grid">
        {/* Summary */}
        <div className="summary">
          <div className="logo">Ziara</div>
          <h2 className="summary-title">Subscribe to {plan.name}</h2>
          <div className="summary-price">
            <span className="s-currency">$</span>
            <span className="s-amount">{plan.price}</span>
            <span className="s-per">/ month</span>
          </div>

          <div className="summary-box">
            <div className="row">
              <span>Subtotal</span>
              <span>${plan.price.toFixed(2)}</span>
            </div>
            <div className="row">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="row row-total">
              <span>Total due today</span>
              <span>${plan.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment form */}
        <div className="form">
          <h3 className="form-title">Contact information</h3>
          <div className="field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>

          <h3 className="form-title">Payment method</h3>
          <div className="field-row">
            <input
              type="text"
              name="number"
              placeholder="1234 1234 1234 1234"
              value={form.number}
              onChange={onChange}
              inputMode="numeric"
              required
            />
            <input
              type="text"
              name="expiry"
              placeholder="MM / YY"
              value={form.expiry}
              onChange={onChange}
              inputMode="numeric"
              required
            />
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
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
              placeholder="Cardholder name"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>

<button className="pay-btn" onClick={payNow} disabled={loading}>
  {loading ? "Processing..." : `Pay $${plan.price} / month`}
</button>

          <p className="fine">
            By subscribing, you agree to our Terms and authorize storing your payment method
            for renewals.
          </p>
        </div>
      </div>
    </div>
  );
}