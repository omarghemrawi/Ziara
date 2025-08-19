// src/components/EditProfileModal.jsx
import React from "react";
import { useTranslation } from "react-i18next";   // ✅ الترجمة
import "./EditProfileModal.css";

const EditProfileModal = ({
  tempName,
  tempCity,
  setTempName,
  setTempCity,
  onSave,
  onCancel
}) => {
  const { t } = useTranslation();  // ✅ hook الترجمة

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{t("editProfile.title")}</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <label className="input-label">{t("editProfile.name.label")}</label>
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          placeholder={t("editProfile.name.placeholder")}
        />

        <label className="input-label">{t("editProfile.city.label")}</label>
        <input
          type="text"
          value={tempCity}
          onChange={(e) => setTempCity(e.target.value)}
          placeholder={t("editProfile.city.placeholder")}
        />

        <div className="modal-actions">
          <button onClick={onSave}>{t("editProfile.save")}</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
