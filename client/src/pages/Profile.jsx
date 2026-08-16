import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${username}/profile`
        );

        setProfile(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <div className="card">

        <h1>{profile.user.name}</h1>

        <p>@{profile.user.username}</p>

        <p>
          {profile.user.bio || "No bio added yet."}
        </p>

        <h2>Travel Memories 🌍</h2>

        {profile.trips.length === 0 ? (
          <div className="empty-state">
            <h3>No trips yet 🌱</h3>
            <p>This traveller hasn't added any trips.</p>
          </div>
        ) : (
          <div className="trip-grid">
            {profile.trips.map((trip) => (
              <div className="trip-card" key={trip._id}>

                {trip.coverImage && (
                  <img
                    src={trip.coverImage}
                    alt={trip.title}
                    className="trip-cover-image"
                  />
                )}

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

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;