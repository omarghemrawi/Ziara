import { useEffect, useState } from "react";
import axios from "axios";
import "./ClientPage.css";
import { toast } from "react-toastify";

const types = ["all", "restaurant", "shop", "hotel", "activity"];
const statuses = ["all", "active", "inactive"];
const plans = ["all", "Standard", "Plus", "Pro"];

const ClientPage = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientPlaces, setClientPlaces] = useState([]);
  const token = localStorage.getItem("adminToken")

  // Filter client places by type, status, plan, and search term
  const filteredPlaces = clientPlaces.filter((place) => {
    const typeMatch = typeFilter === "all" || place.type === typeFilter;
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "active" && place.plan.active) ||
      (statusFilter === "inactive" && !place.plan.active);
    const planMatch = planFilter === "all" || place?.plan?.name === planFilter;
    const searchMatch =
      searchTerm === "" ||
      place.name.toLowerCase().includes(searchTerm.toLowerCase());

    return typeMatch && statusMatch && planMatch && searchMatch;
  });

  // Fetch all client places from the API
  const getPlaces = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/client/to-admin", {
  headers: { Authorization: `Bearer ${token}` },
});
      setClientPlaces(res.data.places);
    } catch (error) {
      console.error("Error fetching client places:", error);
    }
  };

  // Deactivate a client place by ID
  const deactivate = async (placeId) => {
    try {
      const res = await axios.put("http://localhost:5000/api/client/deactive-subscribe", {
        userId: placeId,
      }, {
      headers: { Authorization: `Bearer ${token}` },
      });
      getPlaces();
      if (res) toast("deactive successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a client place 
 const deleteClient = async (id) => {
  try {
    const { data } = await axios.delete(`http://localhost:5000/api/client/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      toast("Client deleted successfully!");
      getPlaces();
      // Optionally, refresh your client list here
    }
  } catch (error) {
    console.error("Failed to delete client:", error);
    toast.error("Failed to delete client.");
  }
};

  // Run once on component mount to load client places
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

        <h4>Type</h4>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        <h4>Status</h4>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        <h4>Plan</h4>
        <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}>
          {plans.map((plan) => (
            <option key={plan} value={plan}>
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="client-place-list">
        {filteredPlaces.map((place) => {
          const { _id, name, profile, type, plan = {} } = place;

          return (
            <div key={_id} className="client-place-card">
              <img src={profile} alt={name} className="client-place-image" />

              <div className="client-place-info">
                <div className="client-place-main">
                  <h3>{name}</h3>
                  <div className="client-place-status">
                    <span
                      className={`status-badge ${
                        plan.active
                          ? "client-place-status-active"
                          : "client-place-status-inactive"
                      }`}
                    >
                      {plan.active ? "Active" : "Inactive"}
                    </span>
                    <span className="type-badge">{type}</span>
                  </div>
                </div>

                <div className="client-place-details">
                  <div className="detail-group">
                    <span className="detail-label">Plan:</span>
                    <span className="detail-value">{plan.name || "N/A"}</span>
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
                  disabled={!plan.active}
                  title={plan.active ? "Deactivate client" : "Already inactive"}
                  className="deactivate-button"
                  onClick={() => deactivate(_id)}
                >
                  Deactivate
                </button>
               
              </div>
              <div>
               <button
                  className="delete-button"
                  onClick={() => deleteClient(_id)}
                >
                  Delete
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
