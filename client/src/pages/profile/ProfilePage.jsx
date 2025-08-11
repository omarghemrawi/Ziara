import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios"
import EditProfileModal from "../../components/EditProfileModal";
import EditDescriptionModal from "../../components/EditDescriptionModal";
import EditLinksModal from "../../components/EditLinksModal";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userActions";
import "./ProfilePage.css";

function SectionCard({ title, action, children }) {
  return (
    <div className="card section-card">
      <div className="section-header">
        <h3 className="section-title">{title}</h3>
        <div className="section-header-right">{action}</div>
      </div>
      <div className="section-content">{children}</div>
    </div>
  );
}

export default function ProfilePage() {
  const [reviews , setReviews] = useState([])
  const user = useSelector((state) => state.user.userData);
  const placeId = user._id
  const dispatch = useDispatch()

  // Local state for edits with default empty values
  const [editedLinks, setEditedLinks] = useState({
    facebook: "",
    instagram: "",
    location: "",
  });
  const [currentAvatar, setCurrentAvatar] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [profileFile, setProfileFile] = useState(null);        
  const [referenceFiles, setReferenceFiles] = useState([]);     

  // Modal visibility
  const [showHeaderModal, setShowHeaderModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);

  const getReviews = async ()=>{
    try {
    const response = await axios.get(`http://localhost:5000/api/review/place/${placeId}`)

    if(response.data.success){
      setReviews(response.data.reviews)
    } 
    } catch (error) {
     console.log(error) 
    }
  }
const saveProfileInfo = async (newName, newCity) => {
  try {
    const formData = new FormData();
    formData.append("name", newName);
    formData.append("city", newCity);
    formData.append("userId", user._id)

    if (profileFile) {
      formData.append("profile", profileFile);
    }

    referenceFiles.forEach((file, idx) => {
      formData.append("referenceImages", file);
    });
    const response = await axios.put("http://localhost:5000/api/client/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data && response.data.user) {
    dispatch(setUser(response.data.user)); 
    setShowHeaderModal(false);
    console.log("Profile updated:", response.data);
  }

  } catch (error) {
    console.error("Error updating profile:", error);
  }
};
const saveDescription = async (newDescription) => {
  try {
    setProfileDescription(newDescription);
    setShowDescriptionModal(false);

    const updateData = {
      userId: user._id,
      description: newDescription,
    };

    const response = await axios.put(
      "http://localhost:5000/api/client/update-profile",
      updateData
    );

    if (response.data.success) {
      console.log("Description updated successfully");
    dispatch(setUser(response.data.user)); 

    } else {
      console.error("Failed to update description");
    }
  } catch (error) {
    console.error("Error updating description:", error);
  }
};
 const saveLinks = async (newLinks) => {
  try {
    // Optimistically update local state and close modal
    setEditedLinks(newLinks);
    setShowLinksModal(false);

    // Prepare update data
    const updateData = {
      userId: user._id,
      facebook: newLinks.facebook,
      instagram: newLinks.instagram,
      location: newLinks.location,
    };

    const response = await axios.put(
      "http://localhost:5000/api/client/update-profile",
      updateData
    );

    if (response.data.success) {
      console.log("Links updated successfully");
      dispatch(setUser(response.data.user)); 

    } else {
      console.error("Failed to update links");
    }
  } catch (error) {
    console.error("Error updating links:", error);
    // Optionally revert UI or notify user
  }
};



useEffect(() => {
    if (user) {
      setEditedLinks({
        facebook: user.facebook || "",
        instagram: user.instagram || "",
        location: user.location || "",
      });
      setCurrentAvatar(user.profile || "");
      setProfileDescription(user.description || "");
      setBusinessName(user.name || "");
      setCity(user.city || "");
    }}, [user]); 
    
    useEffect(()=>{
      getReviews()
    },[])

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
                <img src={currentAvatar} className="avatar-img" alt="Avatar" />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}
            </div>
          </div>
          <div className="profile-details">
            <h2 className="business-name">{businessName}</h2>
            <p className="service-name">{user?.type || "—"}</p>
            <p className="city-name">{city}</p>
          </div>
        </div>
      </div>

      <SectionCard
        title="Description"
        action={
          <button
            type="button"
            className="edit-section"
            title="Edit Description"
            onClick={() => setShowDescriptionModal(true)}
          >
            ✎
          </button>
        }
      >
        <p>{profileDescription || "No description"}</p>
      </SectionCard>

      <SectionCard
        title="Links & Location"
        action={
          <button
            type="button"
            className="edit-section"
            title="Edit Links"
            onClick={() => setShowLinksModal(true)}
          >
            ✎
          </button>
        }
      >
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
        <div className="photo-grid-horizontal">
          {(user?.referenceImages || []).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Photo ${index + 1}`}
              className="uploaded-photo"
            />
          ))}
        </div>
        {/* TODO: Add photo upload controls if needed */}
      </SectionCard>

      <SectionCard title="Reviews">
        <ul className="review-list">
  {reviews.map((review) => (
    <li key={review._id} className="review-item">
      <div className="review-header">
        <img
          src={review.userId.profileImage}
          alt={review.userId.username}
          className="review-user-image"
        />
        <span className="review-username">{review.userId.username}</span>
        <button
          className="report-btn"
          title="Report this review"
          // onClick={() => handleReportReview(review._id)}
        >
          ⚠️
        </button>
      </div>
      <div className="review-rating">
        {"⭐".repeat(review.rating)}
      </div>
      <p className="review-text">{review.comment}</p>
      {review.image && (
        <img
          src={review.image}
          alt="Review"
          className="review-image"
        />
      )}
    </li>
  ))}
</ul>

      </SectionCard>

      {/* Modals */}
      {showHeaderModal && (
        <EditProfileModal
          tempName={businessName}
          tempCity={city}
          setTempName={setBusinessName}
          setTempCity={setCity}
          onSave={() => saveProfileInfo(businessName, city)}
          onCancel={() => setShowHeaderModal(false)}
          setProfileFile={setProfileFile}
          setReferenceFiles={setReferenceFiles}
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
