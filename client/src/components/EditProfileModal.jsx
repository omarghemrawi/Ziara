import React from "react";
import "./EditProfileModal.css";

const EditProfileModal = ({
  tempName,
  tempCity,
  setTempName,
  setTempCity,
  onSave,
  onCancel,
  setProfileFile,
  setReferenceFiles,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <label>Upload Profile Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileFile(e.target.files[0])}
        />

        <label>Upload Reference Images (up to 5):</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setReferenceFiles(Array.from(e.target.files))}
        />

        <label className="input-label">Edit your business name</label>
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          placeholder="Enter a new business name"
        />

        <label className="input-label">Edit city</label>
        <input
          type="text"
          value={tempCity}
          onChange={(e) => setTempCity(e.target.value)}
          placeholder="Enter new location"
        />

        <div className="modal-actions">
          <button onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
