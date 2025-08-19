import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import EditProfileModal from "../../components/EditProfileModal";
import EditDescriptionModal from "../../components/EditDescriptionModal";
import EditLinksModal from "../../components/EditLinksModal";
import { setUser } from "../../redux/userActions";
import { useTranslation } from "react-i18next"; // 👈 Added
import "./ProfilePage.css";

function SectionCard({ title, children }) {
  return (
    <div className="card section-card">
      <div className="section-header">
        <h3 className="section-title">{title}</h3>
        <div className="section-header-right">{children[0]}</div>
      </div>
      <div className="section-content">{children[1]}</div>
    </div>
  );
}

export default function ProfilePage() {
  const { t } = useTranslation(); // 👈 Added
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.user.userData);

  const isRestaurant = (user?.type || "").toLowerCase() === "restaurant";
  const token = localStorage.getItem("token");

  const plan = user?.plan ?? null;
  const planName = (plan?.name || "").toLowerCase();
  const planFee = Number(plan?.fee);
  const isPro = planName === "pro" || planFee === 50;

  const defaultLimitByPlan =
    planName === "plus" || planFee === 20
      ? 10
      : planName === "standard" || planFee === 10
      ? 5
      : 5;

  const serverLimitRaw = plan?.imageLimit;
  const serverLimitNum = Number(serverLimitRaw);
  const safeLimit =
    Number.isFinite(serverLimitNum) && serverLimitNum > 0
      ? serverLimitNum
      : defaultLimitByPlan;

  const imageLimit = isPro ? Infinity : safeLimit;

  const photoHintText = isPro
    ? t("profile.unlimitedPhotos")
    : t("profile.limitedPhotos", { limit: imageLimit });

  const [businessName, setBusinessName] = useState(user?.name || "");
  const [city, setCity] = useState(user?.city || "");
  const [profileDescription, setProfileDescription] = useState(
    user?.description || ""
  );
  const [editedLinks, setEditedLinks] = useState({
    facebook: "",
    instagram: "",
    location: "",
    menu: "",
  });
  const [currentAvatar, setCurrentAvatar] = useState(user?.profile || "");
  const [showHeaderModal, setShowHeaderModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [reviews, setReviews] = useState([]);

  const ratingsCount = Array.isArray(reviews)
    ? reviews.filter((r) => Number(r?.rating) > 0).length
    : 0;
  const reviewsCount = Array.isArray(reviews)
    ? reviews.filter((r) => {
        const txt = r?.comment ?? r?.reviewComment ?? r?.text ?? r?.review;
        return typeof txt === "string" && txt.trim().length > 0;
      }).length
    : 0;

  const placeId = user?._id;

  const getReviews = useCallback(async () => {
    if (!placeId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/review/place/${placeId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.success) setReviews(res.data.reviews || []);
    } catch (e) {
      console.log(e);
    }
  }, [placeId, token]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  useEffect(() => {
    if (!user) return;
    const _isRestaurant = (user?.type || "").toLowerCase() === "restaurant";
    setBusinessName(user.name || "");
    setCity(user.city || "");
    setProfileDescription(user.description || "");
    setEditedLinks({
      facebook: user.facebook || "",
      instagram: user.instagram || "",
      location: user.location || "",
      menu: _isRestaurant ? user.menu || "" : "",
    });
    setCurrentAvatar(user.profile || "");
  }, [user]);

  const gallery = user?.referenceImages || [];
  const [showUploadHint, setShowUploadHint] = useState(() => gallery.length === 0);
  useEffect(() => {
    if (gallery.length > 0) setShowUploadHint(false);
  }, [gallery.length]);

  const avatarInputRef = useRef(null);
  const handleEditPhoto = () => avatarInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setCurrentAvatar(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const [selectMode, setSelectMode] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const toggleSelectMode = () => {
    setSelectMode((p) => !p);
    setSelectedIndexes([]);
  };

  const togglePhotoSelection = (i) =>
    setSelectedIndexes((p) =>
      p.includes(i) ? p.filter((x) => x !== i) : [...p, i]
    );

const handlePhotoUpload = async (e) => {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;

  // تأكد من الحد الأقصى حسب الخطة
  if (Number.isFinite(imageLimit) && gallery.length + files.length > imageLimit) {
    alert(t("profile.limitedPhotos", { limit: imageLimit }));
    e.target.value = "";
    return;
  }

  try {
    const formData = new FormData();
    formData.append("userId", user._id);
    files.forEach((f) => formData.append("referenceImages", f));

    const res = await axios.put(
      "http://localhost:5000/api/client/update-profile",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data?.user) {
      // تحديث بيانات المستخدم بالـ Redux → الصور بتبين بالـ gallery
      dispatch(setUser(res.data.user));
      setShowUploadHint(false);
    }
  } catch (err) {
    console.error(t("profile.uploadFailed"), err);
  }

  e.target.value = "";
};


const deleteSelectedPhotos = async () => {
  if (!selectedIndexes.length) return;
  const toDelete = selectedIndexes.map((i) => gallery[i]).filter(Boolean);
  if (!toDelete.length) return;

  try {
    const payload = {
      userId: user._id,
      deleteReferences: toDelete,
      referenceImagesToDelete: toDelete, // تغطية أي اختلاف بالأسماء
    };

    const res = await axios.put(
      "http://localhost:5000/api/client/update-profile",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data?.user) {
      dispatch(setUser(res.data.user));
      setSelectedIndexes([]);
      setSelectMode(false);
    }
  } catch (err) {
    console.error(t("profile.deleteFailed"), err);
  }
};


  const handleViewReviews = () => navigate(`/reviews/${placeId}`);
  const handleEditPlan = () => navigate("/plan");

  const serviceRaw = (user?.type ?? user?.business ?? user?.service ?? "").toString();
  const serviceNamePretty = serviceRaw
    ? serviceRaw.charAt(0).toUpperCase() + serviceRaw.slice(1)
    : "—";

  return (
    <div className="profile-page">
      <div className="card header-card">
        <div className="header-part header-part--top">
          <button
            type="button"
            className="edit-header"
            title={t("profile.editProfileInfo")}
            onClick={() => setShowHeaderModal(true)}
          >
            ✎
          </button>
        </div>

        <div className="header-part header-part--bottom">
          <div className="avatar-area">
            <div className="avatar-clip">
              {currentAvatar ? (
                <img src={currentAvatar} className="avatar-img" alt="" />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}
            </div>
            <button
              type="button"
              className="edit-avatar"
              onClick={handleEditPhoto}
              title={t("profile.changePhoto")}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={avatarInputRef}
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="profile-details">
            <h2 className="business-name">{businessName}</h2>
            <p className="service-name">{serviceNamePretty}</p>
            <p className="city-name">{city}</p>
          </div>
        </div>
      </div>

      <SectionCard title={t("profile.description")}>
        <button
          type="button"
          className="edit-section"
          title={t("profile.editDescription")}
          onClick={() => setShowDescriptionModal(true)}
        >
          ✎
        </button>
        <p>{profileDescription || t("profile.noDescription")}</p>
      </SectionCard>

      <SectionCard title={t("profile.links")}>
        <button
          type="button"
          className="edit-section"
          title={t("profile.editLinks")}
          onClick={() => setShowLinksModal(true)}
        >
          ✎
        </button>
        <ul className="links-list">
          <li>
            <strong>{t("profile.instagram")}:</strong> {editedLinks.instagram || "—"}
          </li>
          <li>
            <strong>{t("profile.facebook")}:</strong> {editedLinks.facebook || "—"}
          </li>
          <li>
            <strong>{t("profile.location")}:</strong> {editedLinks.location || "—"}
          </li>
          {isRestaurant && (
            <li>
              <strong>{t("profile.menu")}:</strong> {editedLinks.menu || "—"}
            </li>
          )}
        </ul>
      </SectionCard>

      <SectionCard title={t("profile.photos")}>
        <button
          type="button"
          className="edit-section"
          title={t("profile.editPhotos")}
          onClick={toggleSelectMode}
        >
          ✎
        </button>
        <div>
          {showUploadHint && <p className="upload-hint">{photoHintText}</p>}
          <div className="photo-grid-horizontal">
            {gallery.map((src, idx) => (
              <img
                key={src || idx}
                src={src}
                alt=""
                className={`uploaded-photo ${
                  selectMode && selectedIndexes.includes(idx) ? "selected" : ""
                }`}
                onClick={() => selectMode && togglePhotoSelection(idx)}
              />
            ))}
          </div>
          <div className="photo-controls">
            <label htmlFor="photo-upload" className="upload-btn">
              {t("profile.uploadPhoto")}
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="upload-input-hidden"
            />
          </div>
          {selectMode && (
            <button className="delete-selected-btn" onClick={deleteSelectedPhotos}>
              {t("profile.deleteSelected")}
            </button>
          )}
        </div>
      </SectionCard>

      <SectionCard title={t("profile.reviews")}>
        <button
          type="button"
          className="edit-section"
          title={t("profile.viewAllReviews")}
          onClick={handleViewReviews}
        >
          {t("profile.viewAll")}
        </button>
        <div className="reviews-row">
          <span>{reviewsCount} {t("profile.reviewsCount")}</span>
          <span>{ratingsCount} {t("profile.ratingsCount")}</span>
        </div>
      </SectionCard>

      <SectionCard title={t("profile.upgradePlan")}>
        <button
          type="button"
          className="edit-section"
          title={t("profile.editPlan")}
          onClick={handleEditPlan}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <div>
          <h4>
            {t("profile.subscribedPlan", { plan: plan?.name ?? "—", fee: planFee || 0 })}
          </h4>
        </div>
      </SectionCard>

      {showHeaderModal && (
        <EditProfileModal
          tempName={businessName}
          tempCity={city}
          setTempName={setBusinessName}
          setTempCity={setCity}
          onSave={() => {}}
          onCancel={() => setShowHeaderModal(false)}
          setProfileFile={() => {}}
          setReferenceFiles={() => {}}
        />
      )}
      {showDescriptionModal && (
        <EditDescriptionModal
          description={profileDescription}
          onChange={setProfileDescription}
          onSave={() => {}}
          onCancel={() => setShowDescriptionModal(false)}
        />
      )}
      {showLinksModal && (
        <EditLinksModal
          links={editedLinks}
          setLinks={setEditedLinks}
          onSave={() => {}}
          onCancel={() => setShowLinksModal(false)}
        />
      )}
    </div>
  );
}
