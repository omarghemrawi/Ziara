import React, { useState } from "react";
import "./Plan.css";
const Plan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const plans = [
    {
      id: "monthly",
      name: "Monthly Plan",
      duration: "30 days",
      basePrice: 20,
      description: "Perfect for getting started",
      features: ["Basic features", "Email support", "Cancel anytime"],
      priorities: [
        { level: "low", name: "Low Priority", extraFee: 0 },
        { level: "medium", name: "Medium Priority", extraFee: 5 },
        { level: "high", name: "High Priority", extraFee: 10 },
      ],
    },
    {
      id: "semiannual",
      name: "Semi-Annual Plan",
      duration: "180 days",
      basePrice: 100,
      description: "Great value for regular users",
      features: ["All features", "Priority support", "17% savings"],
      priorities: [
        { level: "low", name: "Low Priority", extraFee: 0 },
        { level: "medium", name: "Medium Priority", extraFee: 15 },
        { level: "high", name: "High Priority", extraFee: 30 },
      ],
    },
    {
      id: "annual",
      name: "Annual Plan",
      duration: "365 days",
      basePrice: 180,
      description: "Best value for power users",
      features: ["Premium features", "24/7 support", "25% savings"],
      priorities: [
        { level: "low", name: "Low Priority", extraFee: 0 },
        { level: "medium", name: "Medium Priority", extraFee: 30 },
        { level: "high", name: "High Priority", extraFee: 60 },
      ],
    },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setSelectedPriority(null); // Reset priority when plan changes
  };

  const handleSelectPriority = (priority) => {
    setSelectedPriority(priority);
  };

  const getTotalPrice = () => {
    if (!selectedPlan || !selectedPriority) return 0;
    return selectedPlan.basePrice + selectedPriority.extraFee;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .substring(0, 19);
    }

    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5);
    }

    if (name === "cvc") {
      formattedValue = value.replace(/\D/g, "").substring(0, 3);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = () => {
    if (!selectedPlan || !selectedPriority) {
      alert("Please select both a plan and priority level.");
      return;
    }
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvc
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(
      `Payment submitted!\nPlan: ${selectedPlan.name}\nPriority: ${
        selectedPriority.name
      }\nTotal Amount: $${getTotalPrice()}`
    );
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="main-title">Choose Your Subscription Plan</h1>
        <p className="subtitle">
          Select the perfect plan and priority level for your needs
        </p>
      </div>

      <div className="container">
        <div className="plan-section">
          <h2 className="section-title">Available Plans</h2>
          <div className="plans">
            {plans.map((plan) => (
              <div key={plan.id} className="plan-container">
                <div
                  className={`plan ${
                    selectedPlan?.id === plan.id ? "plan-selected" : ""
                  }`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  <div className="plan-header">
                    <div>
                      <h3 className="plan-name">{plan.name}</h3>
                      <p className="plan-duration">{plan.duration}</p>
                    </div>
                    <div className="plan-price">
                      <span className="price-amount">${plan.basePrice}</span>
                      <span className="base-price-label">base price</span>
                    </div>
                  </div>

                  <p className="plan-description">{plan.description}</p>

                  <ul className="feature-list">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="feature">
                        <span className="checkmark">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {selectedPlan?.id === plan.id && (
                    <div className="selected-badge">
                      <span className="selected-text">✓ Selected</span>
                    </div>
                  )}
                </div>

                {/* Priority Selection - only show if this plan is selected */}
                {selectedPlan?.id === plan.id && (
                  <div className="priority-selection">
                    <h4 className="priority-title">Choose Priority Level:</h4>
                    <div className="priority-options">
                      {plan.priorities.map((priority) => (
                        <div
                          key={priority.level}
                          className={`priority-option ${
                            selectedPriority?.level === priority.level
                              ? "priority-selected"
                              : ""
                          }`}
                          onClick={() => handleSelectPriority(priority)}
                        >
                          <div className="priority-info">
                            <span
                              className={`priority-badge priority-${priority.level}`}
                            >
                              {priority.name}
                            </span>
                            <span className="priority-fee">
                              {priority.extraFee === 0
                                ? "($0)"
                                : `(+$${priority.extraFee})`}
                            </span>
                          </div>
                          {selectedPriority?.level === priority.level && (
                            <span className="priority-check">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="payment-section">
          {selectedPlan && selectedPriority ? (
            <div className="payment-form">
              <h2 className="section-title">Payment Details</h2>

              <div className="order-summary">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-row">
                  <span>Plan:</span>
                  <span className="summary-value">{selectedPlan.name}</span>
                </div>
                <div className="summary-row">
                  <span>Duration:</span>
                  <span className="summary-value">{selectedPlan.duration}</span>
                </div>
                <div className="summary-row">
                  <span>Priority:</span>
                  <span className="summary-value">{selectedPriority.name}</span>
                </div>
                <div className="summary-row">
                  <span>Base Price:</span>
                  <span className="summary-value">
                    ${selectedPlan.basePrice}
                  </span>
                </div>
                {selectedPriority.extraFee > 0 && (
                  <div className="summary-row">
                    <span>Priority Fee:</span>
                    <span className="summary-value">
                      +${selectedPriority.extraFee}
                    </span>
                  </div>
                )}
                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span className="total-amount">${getTotalPrice()}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="card-info">
                <div className="form-group">
                  <label className="label">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="label">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <button onClick={handleSubmit} className="pay-btn">
                Pay Now - ${getTotalPrice()}
              </button>

              <div className="security-note">
                <span className="lock-icon">🔒</span>
                Your payment information is secure and encrypted
              </div>
            </div>
          ) : (
            <div className="select-message">
              <div className="select-icon">💳</div>
              <h3 className="select-title">Ready to get started?</h3>
              <p className="select-text">
                {!selectedPlan
                  ? "Please select a plan to continue with payment."
                  : "Please select a priority level to continue with payment."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plan;
