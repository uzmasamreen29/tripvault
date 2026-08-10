import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

{loadingTrips && <p>Loading your trips...</p>}

{tripError && <p>{tripError}</p>}

{!loadingTrips && !tripError && trips.length === 0 && (
  <p>You don't have any trips yet. Create your first trip! 🌍</p>
)}

{!loadingTrips && trips.length > 0 && (
  <div>
    {trips.map((trip) => (
      <div key={trip._id}>
        <h3>{trip.title}</h3>

        <p>📍 {trip.destination}</p>

        <p>
          📅 {new Date(trip.startDate).toLocaleDateString()} -{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>

        <p>⭐ {trip.rating}/5</p>

        <p>{trip.description}</p>

        <hr />
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