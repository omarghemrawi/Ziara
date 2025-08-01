import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ClientPage.css";

const types = ["all", "restaurant", "shop", "hotel", "activity"];
const statuses = ["all", "active", "inactive"];
const plans = ["all", "Basic", "Standard", "Premium", "Enterprise"];

const ClientPage = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientPlaces, setClientPlaces] = useState([]);

  const filteredPlaces = clientPlaces.filter((place) => {
    const typeMatch = typeFilter === "all" || place.type === typeFilter;
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "active" && place.active) ||
      (statusFilter === "inactive" && !place.active);
    const planMatch = planFilter === "all" || place?.plan?.type === planFilter;
    const searchMatch =
      searchTerm === "" ||
      place.name.toLowerCase().includes(searchTerm.toLowerCase());

    return typeMatch && statusMatch && planMatch && searchMatch;
  });

  const getPlaces = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/client/places");
      setClientPlaces(res.data.places);
    } catch (error) {
      console.error("Error fetching client places:", error);
    }
  };

  const deactivate = async (placeId) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/client/deactive-subscribe",
        { userId: placeId }
      );
      getPlaces();
      if (res) alert("deactive successfly");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <div className="client-page-container">
      <h2>Client Places</h2>

      <div className="client-page-filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="client-search-input"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
        >
          {plans.map((plan) => (
            <option key={plan} value={plan}>
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="client-place-list">
        {filteredPlaces.map((place) => {
          const { _id, name, profile, active, type, plan = {} } = place;

          return (
            <div key={_id} className="client-place-card">
              <img src={profile} alt={name} className="client-place-image" />

              <div className="client-place-info">
                <div className="client-place-main">
                  <h3>{name}</h3>
                  <div className="client-place-status">
                    <span
                      className={`status-badge ${
                        active
                          ? "client-place-status-active"
                          : "client-place-status-inactive"
                      }`}
                    >
                      {active ? "Active" : "Inactive"}
                    </span>
                    <span className="type-badge">{type}</span>
                  </div>
                </div>

                <div className="client-place-details">
                  <div className="detail-group">
                    <span className="detail-label">Plan:</span>
                    <span className="detail-value">{plan.type || "N/A"}</span>
                  </div>
                  <div className="detail-group">
                    <span className="detail-label">Fee:</span>
                    <span className="detail-value">
                      ${plan.fee?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  <div className="detail-group">
                    <span className="detail-label">Subscribed:</span>
                    <span className="detail-value">
                      {plan.subscribeAt
                        ? new Date(plan.subscribeAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="detail-group">
                    <span className="detail-label">Expires:</span>
                    <span className="detail-value">
                      {plan.expireAt
                        ? new Date(plan.expireAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="detail-group">
                    <span className="detail-label">Priority:</span>
                    <span className="detail-value">
                      {plan.priority || "None"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="client-place-actions">
                <button
                  disabled={!place.active}
                  title={active ? "Deactivate client" : "Already inactive"}
                  className="deactivate-button"
                  onClick={() => {
                    deactivate(place._id);
                  }}
                >
                  Deactivate
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientPage;
