// ============================================================
// File: src/pages/profile/ProfilePage.jsx
// Purpose: Profile page for viewing and editing user/business info,
//          images, links, description, plan details, and reviews.
// NOTE: The logic and JSX are kept IDENTICAL to your original code.
//       Only formatting and explanatory comments were added.
// ============================================================

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
import "./ProfilePage.css";

// ------------------------------------------------------------
// Reusable section wrapper: renders a card with title and header-right
// content (children[0]) and the section body (children[1]).
// ------------------------------------------------------------
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

// ------------------------------------------------------------
// Main: ProfilePage
// ------------------------------------------------------------
export default function ProfilePage() {
  // Redux + Router helpers
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logged-in user from Redux state
  const user = useSelector((s) => s.user.userData);

  // Whether the business type is restaurant (affects 'menu' link field)
  const isRestaurant = (user?.type || "").toLowerCase() === "restaurant";

  // Auth token used in API requests
  const token = localStorage.getItem("token");

  // ===== Plans / limits (آمن ضد عدم وجود plan) =====
  const plan = user?.plan ?? null;
  const planName = (plan?.name || "").toLowerCase();
  const planFee = Number(plan?.fee);
  const isPro = planName === "pro" || planFee === 50;

  // Default per-plan image limit (fallback if server doesn't send one)
  const defaultLimitByPlan =
    planName === "plus" || planFee === 20
      ? 10
      : planName === "standard" || planFee === 10
      ? 5
      : 5; // لا خطة

  // Use server-provided imageLimit if valid; otherwise fall back
  const serverLimitRaw = plan?.imageLimit;
  const serverLimitNum = Number(serverLimitRaw);
  const safeLimit =
    Number.isFinite(serverLimitNum) && serverLimitNum > 0
      ? serverLimitNum
      : defaultLimitByPlan;

  // Final limit (Infinity for Pro)
  const imageLimit = isPro ? Infinity : safeLimit;

  // Photo hint shown when there are no photos yet
  const photoHintText = isPro
    ? "You can upload unlimited photos."
    : `You can upload only ${imageLimit} photos.`;

  // ===== Editable fields shown in UI (bind to modals/inputs) =====
  const [businessName, setBusinessName] = useState(user?.name || "");
  const [city, setCity] = useState(user?.city || "");
  const [profileDescription, setProfileDescription] = useState(
    user?.description || ""
  );
  const [editedLinks, setEditedLinks] = useState({
    facebook: "",
    instagram: "",
    location: "",
    menu: "", // موجود دايمًا، فاضي إذا مش restaurant
  });

  // Current avatar URL/base64 preview
  const [currentAvatar, setCurrentAvatar] = useState(user?.profile || "");

  // Modal visibility flags
  const [showHeaderModal, setShowHeaderModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);

  // Reviews state (list from server)
  const [reviews, setReviews] = useState([]);

  // Count of ratings (numeric ratings only)
  const ratingsCount = Array.isArray(reviews)
    ? reviews.filter((r) => Number(r?.rating) > 0).length
    : 0;

  // Count of textual reviews (comments)
  const reviewsCount = Array.isArray(reviews)
    ? reviews.filter((r) => {
        const txt = r?.comment ?? r?.reviewComment ?? r?.text ?? r?.review;
        return typeof txt === "string" && txt.trim().length > 0;
      }).length
    : 0;

  // Place id for fetching reviews/navigating to reviews page
  const placeId = user?._id;

  // ----------------------------------------------------------
  // Fetch reviews for this place (memoized by placeId/token)
  // ----------------------------------------------------------
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

  // Load reviews on mount/place change
  useEffect(() => {
    getReviews();
  }, [getReviews]);

  // Debug: log user from Redux when it changes
  useEffect(() => {
    console.log("👤 user from Redux:", user);
  }, [user]);

  // Sync UI fields whenever user changes
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
      menu: _isRestaurant ? (user.menu || "") : "",
    });
    setCurrentAvatar(user.profile || "");
  }, [user]);

  // ----------------------------------------------------------
  // Gallery (reference images) + showUploadHint when empty
  // ----------------------------------------------------------
  const gallery = user?.referenceImages || [];
  const [showUploadHint, setShowUploadHint] = useState(
    () => gallery.length === 0
  );
  useEffect(() => {
    if (gallery.length > 0) setShowUploadHint(false);
  }, [gallery.length]);

  // ----------------------------------------------------------
  // Save: profile info (name, city) + optional profile/reference images
  // ----------------------------------------------------------
  const saveProfileInfo = async (
    newName,
    newCity,
    profileFile = null,
    referenceFiles = []
  ) => {
    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("name", newName);
      formData.append("city", newCity);
      if (profileFile) formData.append("profile", profileFile);
      referenceFiles.forEach((f) => formData.append("referenceImages", f));

      const res = await axios.put(
        "http://localhost:5000/api/client/update-profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.user) {
        dispatch(setUser(res.data.user));
        setShowHeaderModal(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save: description only
  const saveDescription = async (newDescription) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/client/update-profile",
        { description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        setShowDescriptionModal(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save: links (and menu only if restaurant)
  const saveLinks = async (newLinks) => {
    try {
      const payload = {
        userId: user._id,
        facebook: newLinks.facebook,
        instagram: newLinks.instagram,
        location: newLinks.location,
        ...(isRestaurant && { menu: newLinks.menu }),
      };
      const res = await axios.put(
        "http://localhost:5000/api/client/update-profile",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        setShowLinksModal(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // ----------------------------------------------------------
  // Avatar edit (open file picker + upload and update preview)
  // ----------------------------------------------------------
  const avatarInputRef = useRef(null);
  const handleEditPhoto = () => avatarInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setCurrentAvatar(reader.result);
    reader.readAsDataURL(file);
    await saveProfileInfo(businessName, city, file, []);
    e.target.value = "";
  };

  // ----------------------------------------------------------
  // Photos section: select/delete + upload multiple reference images
  // ----------------------------------------------------------
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

    // Enforce plan image limit (if not Infinity)
    if (
      Number.isFinite(imageLimit) &&
      gallery.length + files.length > imageLimit
    ) {
      alert(`You can upload only ${imageLimit} photos.`);
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
        dispatch(setUser(res.data.user));
        setShowUploadHint(false);
      }
    } catch (err) {
      console.error(err);
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
        referenceImagesToDelete: toDelete, // غطّي اختلاف اسم الحقل بالسيرفر
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
      console.error(err);
    }
  };

  // ----------------------------------------------------------
  // Navigation handlers
  // ----------------------------------------------------------
  const handleViewReviews = () => navigate(`/reviews/${placeId}`);
  const handleEditPlan = () => navigate("/plan");

  // تجهيز اسم الخدمة للعرض مع دعم لأسماء حقول مختلفة
const serviceRaw = (user?.type ?? user?.business ?? user?.service ?? "").toString();
const serviceNamePretty = serviceRaw
  ? serviceRaw.charAt(0).toUpperCase() + serviceRaw.slice(1)
  : "—";


  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------
  return (
    
    <div className="profile-page">
      {/* ================= Header card (avatar + name + city) ================ */}
      <div className="card header-card">
        <div className="header-part header-part--top">
          <button
            type="button"
            className="edit-header"
            title="Edit Profile Info"
            onClick={() => setShowHeaderModal(true)}
          >
            ✎
          </button>
        </div>

        <div className="header-part header-part--bottom">
          {/* Avatar block */}
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
              title="Change Profile Image"
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

          {/* Name / type / city */}
          <div className="profile-details">
            <h2 className="business-name">{businessName}</h2>
           <p className="service-name">{serviceNamePretty}</p>
            <p className="city-name">{city}</p>
          </div>
        </div>
      </div>

      {/* ================= Section: Description ================= */}
      <SectionCard title="Description">
        <button
          type="button"
          className="edit-section"
          title="Edit Description"
          onClick={() => setShowDescriptionModal(true)}
        >
          ✎
        </button>
        <p>{profileDescription || "No description"}</p>
      </SectionCard>

      {/* ================= Section: Links & Location ================= */}
      <SectionCard title="Links & Location">
        <button
          type="button"
          className="edit-section"
          title="Edit Links"
          onClick={() => setShowLinksModal(true)}
        >
          ✎
        </button>
        <ul className="links-list">
          <li>
            <strong>Instagram:</strong> {editedLinks.instagram || "—"}
          </li>
          <li>
            <strong>Facebook:</strong> {editedLinks.facebook || "—"}
          </li>
          <li>
            <strong>Location:</strong> {editedLinks.location || "—"}
          </li>
          {isRestaurant && (
            <li>
              <strong>Menu:</strong> {editedLinks.menu || "—"}
            </li>
          )}
        </ul>
      </SectionCard>

      {/* ================= Section: Photos ================= */}
      <SectionCard title="Photos">
        <button
          type="button"
          className="edit-section"
          title="Edit Photos"
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
                alt="" // decorative
                className={`uploaded-photo ${
                  selectMode && selectedIndexes.includes(idx) ? "selected" : ""
                }`}
                onClick={() => selectMode && togglePhotoSelection(idx)}
              />
            ))}
          </div>

          <div className="photo-controls">
            <label htmlFor="photo-upload" className="upload-btn">
              Upload a Photo
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
              Delete Selected Photos
            </button>
          )}
        </div>
      </SectionCard>

      {/* ================= Section: Rating & Review ================= */}
      <SectionCard title="Rating & Review">
        <button
          type="button"
          className="edit-section"
          title="View All Reviews"
          onClick={handleViewReviews}
        >
          View All
        </button>

        <div className="reviews-row">
          <span>{reviewsCount} Reviews</span>
          <span>{ratingsCount} Rating</span>
        </div>
      </SectionCard>

      {/* ================= Section: Upgrade Your Plan ================= */}
      <SectionCard title="Upgrade Your Plan">
        {/* Header-right: pen goes first */}
        <button
          type="button"
          className="edit-section"
          title="Edit Plan"
          aria-label="Edit plan"
          onClick={handleEditPlan}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>

        {/* Body content */}
        <div>
          <h4>
            You have subscribe by : {plan?.name ?? "—"} Plan
            {Number.isFinite(planFee) ? ` with fee ${planFee}$` : ""}
          </h4>
        </div>
      </SectionCard>

      {/* ================= Modals ================= */}
      {showHeaderModal && (
        <EditProfileModal
          tempName={businessName}
          tempCity={city}
          setTempName={setBusinessName}
          setTempCity={setCity}
          onSave={() => saveProfileInfo(businessName, city)}
          onCancel={() => setShowHeaderModal(false)}
          setProfileFile={(file) => saveProfileInfo(businessName, city, file)}
          setReferenceFiles={(files) =>
            saveProfileInfo(businessName, city, null, files)
          }
        />
      )}

      {showDescriptionModal && (
        <EditDescriptionModal
          description={profileDescription}
          onChange={setProfileDescription}
          onSave={() => saveDescription(profileDescription)}
          onCancel={() => setShowDescriptionModal(false)}
        />
      )}

      {showLinksModal && (
        <EditLinksModal
          links={editedLinks}
          setLinks={setEditedLinks}
          onSave={() => saveLinks(editedLinks)}
          onCancel={() => setShowLinksModal(false)}
        />
      )}
    </div>
  );
}
