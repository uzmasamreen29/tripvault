import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
        "http://localhost:5000/api/auth/login",
        formData
      );

      alert("✅ Login Successful!");

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-icon">✈️</div>

        <h1>Welcome Back!</h1>

        <p className="login-subtitle">
          Sign in to continue your TripVault journey
        </p>

        <form onSubmit={handleSubmit}>

          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login ✈️
          </button>

        </form>

        <p className="login-register">
          Don't have an account?
          <Link to="/"> Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;