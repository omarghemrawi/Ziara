// src/components/EditLinksModal.jsx
import React from "react";
import { useTranslation } from "react-i18next";   // ✅ الترجمة
import "./EditLinksModal.css";

export default function EditLinksModal({
  links,
  setLinks,
  onSave,
  onCancel
}) {
  const { t } = useTranslation();   // ✅ hook الترجمة

  const handleChange = (field, value) => {
    setLinks({ ...links, [field]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content full-width-modal">
        <div className="modal-header">
          <h3>{t("editLinks.title")}</h3>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <label className="input-label">{t("editLinks.instagram.label")}</label>
        <input
          type="text"
          value={links.instagram || ""}
          onChange={(e) => handleChange("instagram", e.target.value)}
          placeholder={t("editLinks.instagram.placeholder")}
        />

        <label className="input-label">{t("editLinks.facebook.label")}</label>
        <input
          type="text"
          value={links.facebook || ""}
          onChange={(e) => handleChange("facebook", e.target.value)}
          placeholder={t("editLinks.facebook.placeholder")}
        />

        <label className="input-label">{t("editLinks.location.label")}</label>
        <input
          type="text"
          value={links.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder={t("editLinks.location.placeholder")}
        />

        {"menu" in links && (
          <div className="form-row">
            <label htmlFor="menu">{t("editLinks.menu.label")}</label>
            <input
              id="menu"
              type="url"
              placeholder={t("editLinks.menu.placeholder")}
              value={links.menu}
              onChange={(e) =>
                setLinks((prev) => ({ ...prev, menu: e.target.value }))
              }
            />
          </div>
        )}

        <div className="modal-actions align-right">
          <button onClick={onSave} className="btn save-btn">
            {t("editLinks.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
