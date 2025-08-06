import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddStaticPlace.css";
import axios from "axios";
import { uploadImageToCloudinary } from "../../utils/cloudinaryUpload";

const initialForm = {
  name: "",
  type: "religious", // Default to religious
  description: "",
  profile: "",
  rate: 0,
  location: {
    city: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
  },
  referenceImages: [],
};

const AddStaticPlace = () => {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/static";

  const handleImageUpload = async (file) => {
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      return uploadedUrl;
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      !form.profile ||
      !form.location.city
    ) {
      console.log("Please fill all required fields");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        name: form.name,
        type: form.type,
        description: form.description,
        profile: form.profile,
        rate: parseFloat(form.rate),
        location: {
          city: form.location.city,
          coordinates: {
            latitude: parseFloat(form.location.coordinates.latitude) || null,
            longitude: parseFloat(form.location.coordinates.longitude) || null,
          },
        },
        referenceImages: form.referenceImages,
      });

      if (response.data.success) {
        alert("Place created successfully!");
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
          placeholder="City *"
          value={form.location.city}
          onChange={(e) =>
            setForm({
              ...form,
              location: { ...form.location, city: e.target.value },
            })
          }
          required
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            placeholder="Latitude (optional)"
            value={form.location.coordinates.latitude}
            onChange={(e) =>
              setForm({
                ...form,
                location: {
                  ...form.location,
                  coordinates: {
                    ...form.location.coordinates,
                    latitude: e.target.value,
                  },
                },
              })
            }
            step="any"
          />
          <input
            type="number"
            placeholder="Longitude (optional)"
            value={form.location.coordinates.longitude}
            onChange={(e) =>
              setForm({
                ...form,
                location: {
                  ...form.location,
                  coordinates: {
                    ...form.location.coordinates,
                    longitude: e.target.value,
                  },
                },
              })
            }
            step="any"
          />
        </div>

        <textarea
          placeholder="Description *"
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
          onChange={(e) => setForm({ ...form, rate: e.target.value })}
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
