import React from "react";
import "./EditLinksModal.css";

export default function EditLinksModal({
  links,
  setLinks,
  onSave,
  onCancel
}) {
  const handleChange = (field, value) => {
    setLinks({ ...links, [field]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content full-width-modal">
        <div className="modal-header">
          <h3>Edit Links & Location</h3>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <label className="input-label">Edit Instagram</label>
        <input
          type="text"
          value={links.instagram || ""}
          onChange={(e) => handleChange("instagram", e.target.value)}
          placeholder="Enter your Instagram link"
        />

        <label className="input-label">Edit Facebook</label>
        <input
          type="text"
          value={links.facebook || ""}
          onChange={(e) => handleChange("facebook", e.target.value)}
          placeholder="Enter your Facebook link"
        />

        <label className="input-label">Edit Location</label>
        <input
          type="text"
          value={links.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="Enter your location"
        />
        {/* ... باقي الحقول ... */}

{"menu" in links && ( // NEW: يظهر فقط إذا موجود المفتاح
  <div className="form-row">
    <label htmlFor="menu">Menu (URL)</label>
    <input
      id="menu"
      type="url"
      placeholder="https://your-restaurant.com/menu"
      value={links.menu}
      onChange={(e) =>
        setLinks((prev) => ({ ...prev, menu: e.target.value }))
      }
    />
  </div>
)}


        <div className="modal-actions align-right">
          <button onClick={onSave} className="btn save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}
