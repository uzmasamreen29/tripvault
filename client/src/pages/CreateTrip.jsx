import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../trip-form.css";

function CreateTrip() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    rating: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create trip
      const response = await axios.post(
        "http://localhost:5000/api/trips",
        {
          ...formData,
          rating: formData.rating
            ? Number(formData.rating)
            : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const tripId = response.data.trip._id;

      // Upload image if selected
      if (selectedImage) {
        const imageData = new FormData();
        imageData.append("image", selectedImage);

        await axios.post(
          `http://localhost:5000/api/trips/${tripId}/upload`,
          imageData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to create trip."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trip-form-page">
      <div className="trip-form-card">

        <h2>Create New Trip ✈️</h2>

        {error && (
          <p className="trip-form-error">{error}</p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="trip-form-group">
            <label>Trip Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Goa Beach Vacation"
              required
            />
          </div>

          <div className="trip-form-group">
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g. Goa, India"
              required
            />
          </div>

          <div className="trip-form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="trip-form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          <div className="trip-form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write about your trip..."
            />
          </div>

          <div className="trip-form-group">
            <label>Rating (1–5)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>

          {/* Trip Photo */}
          <div className="trip-form-group">
            <label>Trip Photo</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {selectedImage && (
  <img
    src={URL.createObjectURL(selectedImage)}
    alt="Trip preview"
    className="trip-image-preview"
  />
)} 
          </div>

          <div className="trip-form-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Trip"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateTrip;