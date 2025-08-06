import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadImageToCloudinary } from "../../utils/cloudinaryUpload";

const EditStaticPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "religious",
    description: "",
    profile: "",
    rate: 0,
    location: { city: "", coordinates: { latitude: "", longitude: "" } },
    referenceImages: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/static";

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        setInitialLoading(true);
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        if (data.success) {
          const p = data.data;
          setForm({
            name: p.name || "",
            type: p.type || "religious",
            description: p.description || "",
            profile: p.profile || "",
            rate: p.rate || 0,
            location: {
              city: p.location?.city || "",
              coordinates: {
                latitude: p.location?.coordinates?.latitude || "",
                longitude: p.location?.coordinates?.longitude || "",
              },
            },
            referenceImages: p.referenceImages || [],
          });
        } else {
          setError("Failed to fetch place data");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) fetchPlace();
  }, [id]);

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImageToCloudinary(file);
      setForm((f) => ({ ...f, profile: url }));
    } catch {
      alert("Failed to upload profile image");
    }
  };

  const handleReferenceImageAdd = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImageToCloudinary(file);
      setForm((f) => ({
        ...f,
        referenceImages: [...f.referenceImages, url].slice(0, 15),
      }));
    } catch {
      alert("Failed to upload reference image");
    }
  };

  const handleReferenceImageDelete = (index) => {
    setForm((f) => ({
      ...f,
      referenceImages: f.referenceImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.description ||
      !form.profile ||
      !form.location.city
    ) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          rate: parseFloat(form.rate),
          location: {
            city: form.location.city,
            coordinates: {
              latitude: parseFloat(form.location.coordinates.latitude) || null,
              longitude:
                parseFloat(form.location.coordinates.longitude) || null,
            },
          },
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Place updated successfully!");
        navigate("/staticPlace", { replace: true });
      } else {
        setError(data.message || "Failed to update place");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading)
    return (
      <div className="add-static-place-container">
        <h2>Edit Place</h2>
        <p>Loading place data...</p>
      </div>
    );

  return (
    <div className="add-static-place-container">
      <h2>Edit Place</h2>

      {error && (
        <div
          style={{
            color: "red",
            background: "#ffebee",
            padding: 10,
            borderRadius: 6,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

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

        <div style={{ display: "flex", gap: 10 }}>
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

        <label>Profile Image *</label>
        {form.profile && (
          <img
            src={form.profile}
            alt="Profile"
            style={{ maxWidth: 200, marginBottom: 10 }}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          required={!form.profile}
        />

        <input
          type="number"
          placeholder="Rating (0-5)"
          value={form.rate}
          onChange={(e) => setForm({ ...form, rate: e.target.value })}
          min="0"
          max="5"
          step="0.1"
        />

        <label style={{ marginTop: 20, fontWeight: "bold" }}>
          Reference Images (max 5)
        </label>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 10,
          }}
        >
          {form.referenceImages.map((img, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img
                src={img}
                alt={`ref-${i}`}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
              <button
                type="button"
                onClick={() => handleReferenceImageDelete(i)}
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  border: "none",
                  width: 20,
                  height: 20,
                  cursor: "pointer",
                }}
                aria-label="Delete reference image"
              >
                ×
              </button>
            </div>
          ))}

          {form.referenceImages.length < 15 && (
            <input
              type="file"
              accept="image/*"
              onChange={handleReferenceImageAdd}
              style={{ width: 100, height: 100, cursor: "pointer" }}
              title="Add Reference Image"
            />
          )}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={() => navigate("/staticPlace", { replace: true })}
            style={{ background: "#6c757d" }}
          >
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Place"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStaticPage;
