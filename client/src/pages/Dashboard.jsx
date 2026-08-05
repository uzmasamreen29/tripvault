import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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