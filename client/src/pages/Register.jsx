import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert("✅ Registration Successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>✈️ TripVault</h1>
        <p className="subtitle">
  Create your TripVault account
</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
  <FaUser className="icon" />
  <input
    type="text"
    name="name"
    placeholder="Full Name"
    value={formData.name}
    onChange={handleChange}
  />
</div>

         <div className="input-group">
  <FaEnvelope className="icon" />
  <input
    type="email"
    name="email"
    placeholder="Email Address"
    value={formData.email}
    onChange={handleChange}
  />
</div>
<div className="input-group">
  <FaLock className="icon" />
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
  />
</div>
          <button type="submit">Register</button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;