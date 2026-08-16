import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../trip-form.css";

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
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

        setTrip(response.data);
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

  if (loading) {
    return <p>Loading trip...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!trip) {
    return <p>Trip not found.</p>;
  }

  return (
    <div className="trip-form-page">
      <div className="trip-form-card">

        <h2>{trip.title} ✈️</h2>

        <p>
          📍 <strong>{trip.destination}</strong>
        </p>

        <p>
          📅{" "}
          {trip.startDate
            ? new Date(trip.startDate).toLocaleDateString()
            : "N/A"}
          {" → "}
          {trip.endDate
            ? new Date(trip.endDate).toLocaleDateString()
            : "N/A"}
        </p>

        <p>
          ⭐ {trip.rating || "Not rated"}/5
        </p>

        <p>
          {trip.description || "No description added."}
        </p>

        <h3>Trip Photos 📸</h3>

        {trip.photos && trip.photos.length > 0 ? (
          <div className="photo-grid">
            {trip.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${trip.title} ${index + 1}`}
              />
            ))}
          </div>
        ) : (
          <p>No photos uploaded yet.</p>
        )}

        <button
          onClick={() => navigate("/dashboard")}
          style={{ marginTop: "20px" }}
        >
          ← Back to Dashboard
        </button>

      </div>
    </div>
  );
}

export default TripDetails;