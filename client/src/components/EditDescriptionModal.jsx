// src/components/EditDescriptionModal.jsx
import React from "react";
import { useTranslation } from "react-i18next";   // ✅ الترجمة
import "./EditDescriptionModal.css";

export default function EditDescriptionModal({ description, onChange, onSave, onCancel }) {
  const { t } = useTranslation();   // ✅ hook الترجمة

  return (
    <div className="modal-overlay">
      <div className="modal-content full-width-modal">
        <div className="modal-header">
          <h3>{t("editDescription.title")}</h3>
          <button className="close-btn" onClick={onCancel}>
            ✕
          </button>
        </div>

        <textarea
          value={description}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("editDescription.placeholder")}
          className="description-textarea"
        />

        <div className="modal-actions align-right">
          <button onClick={onSave} className="btn save-btn">
            {t("editDescription.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
