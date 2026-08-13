import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../trip-form.css";

function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    rating: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrip = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/trips/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const trip = response.data;

        setFormData({
          title: trip.title || "",
          destination: trip.destination || "",
          startDate: trip.startDate
            ? trip.startDate.substring(0, 10)
            : "",
          endDate: trip.endDate
            ? trip.endDate.substring(0, 10)
            : "",
          description: trip.description || "",
          rating: trip.rating || "",
        });
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load trip."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      setSaving(true);
      setError("");

      await axios.put(
        `http://localhost:5000/api/trips/${id}`,
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

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to update trip."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
  return (
    <div className="trip-form-page">
      <div className="trip-form-card">
        <p className="trip-form-loading">Loading trip...</p>
      </div>
    </div>
  );
}

return (
  <div className="trip-form-page">
    <div className="trip-form-card">

      <h2>Edit Trip ✏️</h2>

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
            placeholder="Update your trip description..."
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

        <div className="trip-form-buttons">

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "💾 Save Changes"}
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

export default EditTrip;