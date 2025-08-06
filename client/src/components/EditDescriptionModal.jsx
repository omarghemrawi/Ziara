// EditDescriptionModal.jsx
import React from "react";
import "./EditDescriptionModal.css";

export default function EditDescriptionModal({ description, onChange, onSave, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content full-width-modal">
        <div className="modal-header">
          <h3>Edit Description</h3>
          <button className="close-btn" onClick={onCancel}>
            ✕
          </button>
        </div>

        <textarea
          value={description}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your new description"
          className="description-textarea"
        />

        <div className="modal-actions align-right">
          <button onClick={onSave} className="btn save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}
