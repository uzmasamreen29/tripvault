import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
function Dashboard() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [tripError, setTripError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  const fetchTrips = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    setLoadingTrips(true);
    setTripError("");

    const response = await axios.get(
      "http://localhost:5000/api/trips",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTrips(response.data);
  } catch (error) {
    console.error("Error fetching trips:", error);
    setTripError("Unable to load your trips.");
  } finally {
    setLoadingTrips(false);
  }
};

const handleDelete = async (tripId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this trip?"
  );

  if (!confirmed) {
    return;
  }

  const token = localStorage.getItem("token");

  try {
    await axios.delete(
      `http://localhost:5000/api/trips/${tripId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTrips();
  } catch (error) {
    setTripError(
      error.response?.data?.message || "Failed to delete trip."
    );
  }
};

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);
  
  useEffect(() => {
  fetchTrips();
}, [navigate]);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
  <div className="container">
    <div className="card">
      <h1>✈️ TripVault</h1>

      <p className="subtitle">Your Secure Travel Dashboard</p>

      <hr style={{ margin: "20px 0", opacity: 0.3 }} />

      <h2>Welcome, {user.name} 👋</h2>

      <p style={{ marginTop: "15px" }}>
        <strong>Email:</strong> {user.email}
      </p>
     
      <hr style={{ margin: "30px 0", opacity: 0.3 }} />

<h2>My Trips ✈️</h2>
<button
  onClick={() => navigate("/create-trip")}
  style={{ marginTop: "15px" }}
>
  + Create Trip
</button>

{loadingTrips && <p>Loading your trips...</p>}

{tripError && <p>{tripError}</p>}

{!loadingTrips && !tripError && trips.length === 0 && (
  <div className="empty-state">
    <h3>No trips yet 🌍</h3>
    <p>Start creating your travel memories!</p>
  </div>
)}

{!loadingTrips && trips.length > 0 && (
  <div className="trip-grid">
    {trips.map((trip) => (
      <div className="trip-card" key={trip._id}>
        <h3>{trip.title}</h3>

        <p className="trip-destination">
          📍 {trip.destination}
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

        <p className="trip-rating">
          ⭐ {trip.rating || "Not rated"}/5
        </p>

        <p>
          {trip.description || "No description added."}
        </p>

        <div className="trip-actions">
          <button
            onClick={() => navigate(`/edit-trip/${trip._id}`)}
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => handleDelete(trip._id)}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    ))}
  </div>
)}
      <button
        onClick={handleLogout}
        style={{ marginTop: "25px" }}
      >
        Logout
      </button>
    </div>
  </div>
);

}

export default Dashboard;