import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddStaticPlace.css";
import axios from "axios";
import { uploadImageToCloudinary } from "../../utils/cloudinaryUpload";
import {toast} from "react-toastify"

const initialForm = {
  name: "",
  type: "religious", // Default to religious
  description: "",
  profile: "",
  rate: 0,
  city: "",
  location:"",
  referenceImages: [],
};

const AddStaticPlace = () => {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const API_URL = "${API_URL}
/api/static";
  const token = localStorage.getItem("adminToken")


  const handleImageUpload = async (file) => {
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      return uploadedUrl;
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Failed to upload image");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      !form.profile ||
      !form.city ||
      !form.location
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        name: form.name,
        type: form.type,
        description: form.description,
        profile: form.profile,
        rate: parseFloat(form.rate),
        city: form.city,
        location: form.location,
        referenceImages: form.referenceImages,
       }, {
        headers: { Authorization: `Bearer ${token}` }});

      if (response.data.success) {
        toast.success("Place created successfully!");
        navigate("/staticPlace", { replace: true });
      } else {
        console.log(response.data.message || "Failed to create place");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="add-static-place-container">
      <h2>Add New Place</h2>
      <form className="add-static-place-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Place Name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          required
        >
          <option value="religious">Religious</option>
          <option value="touristic">Touristic</option>
        </select>

        <input
          type="text"
          placeholder="City "
          value={form.city}
          onChange={(e) =>
            setForm({
              ...form,
               city: e.target.value ,
            })
          }
          required
        />
         <input
          type="text"
          placeholder="Location "
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

       

        <textarea
          placeholder="Description "
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              const uploadedUrl = await handleImageUpload(file);
              if (uploadedUrl) {
                setForm({ ...form, profile: uploadedUrl });
              } else {
                alert("Failed to upload image");
              }
            }
          }}
          required
        />

        {form.profile && (
          <img
            src={form.profile}
            alt="Uploaded"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        )}

        <input
          type="number"
          placeholder="Rating (0-5)"
          value={form.rate}
          onChange={(e) => setForm({ ...form, rate: parseFloat(e.target.value) })}
          min="0"
          max="5"
          step="0.1"
        />
        <label style={{ fontWeight: "bold", marginTop: "10px" }}>
          Reference Images (up to 5)
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[0, 1, 2, 3, 4].map((index) => (
            <input
              key={index}
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const imageUrl = await handleImageUpload(file);
                if (imageUrl) {
                  setForm((prevForm) => {
                    const updatedImages = [...prevForm.referenceImages];
                    updatedImages[index] = imageUrl; // Replace or insert at index
                    return { ...prevForm, referenceImages: updatedImages };
                  });
                } else {
                  alert("Failed to upload reference image.");
                }
              }}
            />
          ))}
        </div>

        {/* Optional preview below */}
        {form.referenceImages.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {form.referenceImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`ref-${i}`}
                style={{ width: "100px", height: "auto" }}
              />
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            onClick={() => navigate("/staticPlace", { replace: true })}
            style={{ background: "#6c757d" }}
          >
            Cancel
          </button>
          <button type="submit">Save Place</button>
        </div>
      </form>
    </div>
  );
};

export default AddStaticPlace;
