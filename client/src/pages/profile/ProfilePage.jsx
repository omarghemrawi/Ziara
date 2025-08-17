// src/pages/profile/ProfilePage.jsx
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.user.userData);
 const token = localStorage.getItem("token");

  // حارس توجيه
  // useEffect(() => {
  //   if (!user?._id) navigate("/");
  // }, [user, navigate]);


  // بيانات العرض/التعديل
  const [businessName, setBusinessName] = useState(user?.name || "");
  const [city, setCity] = useState(user?.city || "");
  const [profileDescription, setProfileDescription] = useState(user?.description || "");
  const [editedLinks, setEditedLinks] = useState({
    facebook: user?.facebook || "",
    instagram: user?.instagram || "",
    location: user?.location || "",
  });

  // الصورة الشخصية الحالية
  const [currentAvatar, setCurrentAvatar] = useState(user?.profile || "");

  // مودالات
  const [showHeaderModal, setShowHeaderModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);

  // مراجعات
  const [reviews, setReviews] = useState([]);
  // احسب عدد التقييمات (rating فقط)
const ratingsCount = Array.isArray(reviews)
  ? reviews.filter(r => Number(r?.rating) > 0).length
  : 0;

// احسب عدد المراجعات النصّية (تعليقات)
const reviewsCount = Array.isArray(reviews)
  ? reviews.filter(r => {
      const txt = r?.comment ?? r?.reviewComment ?? r?.text ?? r?.review;
      return typeof txt === "string" && txt.trim().length > 0;
    }).length
  : 0;

  const placeId = user?._id;

  const getReviews = useCallback(async () => {
    if (!placeId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/review/place/${placeId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
      if (res.data?.success) setReviews(res.data.reviews || []);
    } catch (e) {
      console.log(e);
    }
  }, [placeId]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  // ربط الواجهة عند تغيّر اليوزر
  useEffect(() => {
    if (!user) return;
    setBusinessName(user.name || "");
    setCity(user.city || "");
    setProfileDescription(user.description || "");
    setEditedLinks({
      facebook: user.facebook || "",
      instagram: user.instagram || "",
      location: user.location || "",
    });
    setCurrentAvatar(user.profile || "");
  }, [user]);

  // معرض الصور من السيرفر
  const gallery = user?.referenceImages || [];

  // Hint: يظهر فقط إذا ما في صور
  const [showUploadHint, setShowUploadHint] = useState(() => gallery.length === 0);
  useEffect(() => {
    if (gallery.length > 0) setShowUploadHint(false);
  }, [gallery.length]);

  // حفظ الاسم/المدينة + صور
  const saveProfileInfo = async (newName, newCity, profileFile = null, referenceFiles = []) => {
    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("name", newName);
      formData.append("city", newCity);
      if (profileFile) formData.append("profile", profileFile);
      referenceFiles.forEach((f) => formData.append("referenceImages", f));

      const res = await axios.put("http://localhost:5000/api/client/update-profile", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.user) {
        dispatch(setUser(res.data.user));
        setShowHeaderModal(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // حفظ الوصف
  const saveDescription = async (newDescription) => {
    try {
      const res = await axios.put("http://localhost:5000/api/client/update-profile", {
        description: newDescription,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        setShowDescriptionModal(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // حفظ الروابط
  const saveLinks = async (newLinks) => {
    try {
      const res = await axios.put("http://localhost:5000/api/client/update-profile", {
        userId: user._id,
        facebook: newLinks.facebook,
        instagram: newLinks.instagram,
        location: newLinks.location,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        setShowLinksModal(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // قلم الصورة الشخصية
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

  // سكشن الصور (تحديد/حذف + رفع)
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const toggleSelectMode = () => {
    setSelectMode((p) => !p);
    setSelectedIndexes([]);
  };

  const togglePhotoSelection = (i) =>
    setSelectedIndexes((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (gallery.length + files.length > user.plan.imageLimit) {
      alert(`You can upload only ${user.plan.imageLimit} photos.`);
      e.target.value = "";
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      files.forEach((f) => formData.append("referenceImages", f));

      const res = await axios.put("http://localhost:5000/api/client/update-profile", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

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
      const res = await axios.put("http://localhost:5000/api/client/update-profile", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.user) {
        dispatch(setUser(res.data.user));
        setSelectedIndexes([]);
        setSelectMode(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewReviews = () => navigate(`/reviews/${placeId}`);
  const handleEditPlan = () => navigate("/plan");


  return (
    <div className="profile-page">
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

          <div className="profile-details">
            <h2 className="business-name">{businessName}</h2>
            <p className="service-name">{user?.type || "—"}</p>
            <p className="city-name">{city}</p>
          </div>
        </div>
      </div>

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
        </ul>
      </SectionCard>

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
          {showUploadHint && (
            <p className="upload-hint">You can upload only 5 photos.</p>
          )}

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



      <SectionCard title="Upgrade Your Plan">
        <br />
        <h4>You have subscribe by : {user.plan.name} Plan with fee {user.plan.fee}$</h4>
        <button
          type="button"
          className="edit-section"
          title="Edit Plan"
          onClick={handleEditPlan}
        >
          ✎
        </button>
        <button className="subscribe-btn" onClick={handleEditPlan}>
          Subscriptions →
        </button>
      </SectionCard>

      {showHeaderModal && (
        <EditProfileModal
          tempName={businessName}
          tempCity={city}
          setTempName={setBusinessName}
          setTempCity={setCity}
          onSave={() => saveProfileInfo(businessName, city)}
          onCancel={() => setShowHeaderModal(false)}
          setProfileFile={(file) => saveProfileInfo(businessName, city, file)}
          setReferenceFiles={(files) => saveProfileInfo(businessName, city, null, files)}
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
