import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import EditProfileModal from "../components/EditProfileModal";
import EditDescriptionModal from "../components/EditDescriptionModal";
import EditLinksModal from "../components/EditLinksModal";

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
  const navigate = useNavigate();
  const { state: profile } = useLocation();


  const {
     photo,
    businessName: initialName,
    business: initialBusiness = "",
    city: initialCity,
    description: initialDescription = "Test description",
    links = {},
    reviews = { count: 0, rating: 0 },
  } = profile;

  const [businessName, setBusinessName] = useState(initialName);
  const [city, setCity] = useState(initialCity);
  const [profileDescription, setProfileDescription] = useState(initialDescription);
  const [editedLinks, setEditedLinks] = useState(links);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [showHeaderModal, setShowHeaderModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [tempDescription, setTempDescription] = useState(initialDescription);
  const [showUploadHint, setShowUploadHint] = useState(true);

  const serviceName = initialBusiness || "—";

  const handleEditHeader = () => setShowHeaderModal(true);
  const handleEditDescription = () => {
    setTempDescription(profileDescription);
    setShowDescriptionModal(true);
  };
  const handleEditLinks = () => setShowLinksModal(true);
  //const handleEditRating = () => {};
  const handleEditPlan = () => navigate("/plan");

  const toggleSelectMode = () => {
    setSelectMode((p) => !p);
    setSelectedIndexes([]);
  };

  const togglePhotoSelection = (i) =>
    setSelectedIndexes((p) =>
      p.includes(i) ? p.filter((x) => x !== i) : [...p, i]
    );

  const deleteSelectedPhotos = () => {
    setUploadedPhotos((p) => p.filter((_, i) => !selectedIndexes.includes(i)));
    setSelectedIndexes([]);
    setSelectMode(false);
  };

  // Update your handler to hide the hint on first upload:
const handlePhotoUpload = (e) => {
  if (showUploadHint) setShowUploadHint(false);

  const files = Array.from(e.target.files);
  if (uploadedPhotos.length + files.length > 5) {
    alert("You can upload only 5 images.");
    return;
  }
  Promise.all(
    files.map(
      (file) =>
        new Promise((res) => {
          const reader = new FileReader();
          reader.onloadend = () => res(reader.result);
          reader.readAsDataURL(file);
        })
    )
  ).then((images) => setUploadedPhotos((p) => [...p, ...images]));
};


  // ─── Add this ─────────────────────────────────────────────
  // hold the current avatar
  const [currentPhoto, setCurrentPhoto] = useState(photo);
  // ref for the hidden file input
  const avatarInputRef = useRef(null);

  // when pen is clicked, open file picker
  const handleEditPhoto = () => {
    avatarInputRef.current.click();
  };

  // when a file is chosen, read and save it
  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setCurrentPhoto(reader.result);
    reader.readAsDataURL(file);
 };
  
  if (!profile) {
    navigate("/");
    return null;
  }

  return (
     <div className="profile-page">
      <div className="card header-card">
  {/* — Top brown banner with header‐edit pen */}
  <div className="header-part header-part--top">
    <button
      type="button"
      className="edit-header"
      title="Edit Profile Info"
      onClick={handleEditHeader}
    >
      ✎
    </button>
  </div>

  {/* — Bottom white part containing avatar + profile details */}
  <div className="header-part header-part--bottom">
    {/* Avatar + its own upload-photo pen */}
 <div className="avatar-area">
  {/* هذا القالب يقصّ الصورة */}
  <div className="avatar-clip">
    {currentPhoto
      ? <img src={currentPhoto} className="avatar-img" alt="Avatar" />
      : <div className="avatar-placeholder">👤</div>
    }
  </div>

  {/* هذا الزرّ يطفو فوق الحاويّة ولا يُقصّ */}
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


    {/* Profile details, shifted right of avatar */}
    <div className="profile-details">
      <h2 className="business-name">{businessName}</h2>
      <p className="service-name">{serviceName}</p>
      <p className="city-name">{city}</p>
    </div>
  </div>
</div>

      {/* --- other sections unchanged --- */}
      <SectionCard title="Description">
        <button
          type="button"
          className="edit-section"
          title="Edit Description"
          onClick={handleEditDescription}
        >
          ✎
        </button>
        <p>{profileDescription}</p>
      </SectionCard>

      <SectionCard title="Links & Location">
        <button
          type="button"
          className="edit-section"
          title="Edit Links"
          onClick={handleEditLinks}
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
            <strong>TikTok:</strong> {editedLinks.tiktok || "—"}
          </li>
          <li>
            <strong>Location:</strong> {editedLinks.location || "—"}
          </li>
        </ul>
      </SectionCard>



     <SectionCard title="Photo">
  {/* 1) ✎ edit-photos pen in the header */}
  <button
    type="button"
    className="edit-section"
    title="Edit Photos"
    onClick={toggleSelectMode}
  >
    ✎
  </button>

  {/* 2) everything else as one single body node */}
  <div>
    {/* hint until first upload */}
    {showUploadHint && (
      <p className="upload-hint">You can upload only 5 photos.</p>
    )}

    {/* horizontal scroller of thumbnails */}
    <div className="photo-grid-horizontal">
      {uploadedPhotos.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Uploaded ${idx + 1}`}
          className={`uploaded-photo ${
            selectMode && selectedIndexes.includes(idx) ? "selected" : ""
          }`}
          onClick={() => selectMode && togglePhotoSelection(idx)}
        />
      ))}
    </div>

    {/* old-style Upload button, always at the bottom-right */}
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

    {/* delete-selected toggle */}
    {selectMode && (
      <button
        className="delete-selected-btn"
        onClick={deleteSelectedPhotos}
      >
        Delete Selected Photos
      </button>
    )}
  </div>
</SectionCard>


      <SectionCard title="Rating & Review">
      {null/*  <button
          type="button"
          className="edit-section"
          title="Edit Rating"
          onClick={handleEditRating}
        >
          ✎
        </button> */}
        <div className="reviews-row">
          <span>{reviews.count} Reviews</span>
          <span>{reviews.rating} Rating</span>
        </div>
      </SectionCard>


<SectionCard title="Upgrade Your Plan">
  <button
    type="button"
    className="edit-section"
    title="Edit Plan"
    onClick={handleEditPlan}
  >
    ✎
  </button>
  <button
    className="subscribe-btn"
    onClick={handleEditPlan}
  >
    Subscriptions →
  </button>
</SectionCard>



      {/* --- Modals unchanged --- */}
      {showHeaderModal && (
        <EditProfileModal
          title="Edit Profile"
          tempName={businessName}
          tempCity={city}
          setTempName={setBusinessName}
          setTempCity={setCity}
          onSave={(n, c) => {
            setBusinessName(n);
            setCity(c);
            setShowHeaderModal(false);
          }}
          onCancel={() => setShowHeaderModal(false)}
        />
      )}
      {showDescriptionModal && (
        <EditDescriptionModal
          description={tempDescription}
          onChange={setTempDescription}
          onSave={() => {
            setProfileDescription(tempDescription);
            setShowDescriptionModal(false);
          }}
          onCancel={() => setShowDescriptionModal(false)}
        />
      )}
      {showLinksModal && (
        <EditLinksModal
          links={editedLinks}
          setLinks={setEditedLinks}
          onSave={() => setShowLinksModal(false)}
          onCancel={() => setShowLinksModal(false)}
        />
      )}
    </div>
  );
}
