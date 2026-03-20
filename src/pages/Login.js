import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // reuse the same CSS for styling

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", credentials);
      localStorage.setItem("user", JSON.stringify(res.data));

      const role = res.data.role;
      if (role === "ADMIN") navigate("/admin");
      else if (role === "DISTRIBUTOR") navigate("/distributor");
      else navigate("/customer");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="register-page">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">Gas Track</div>
          <div className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/register" className="nav-btn">Register</a>
          </div>
        </div>
      </nav>

      <div className="auth-container">
        <div className="auth-card">
          <h1>Login</h1>
          <p>Enter your account credentials to access your dashboard</p>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <span className="error">{error}</span>}

            <button type="submit" className="auth-btn">Login</button>

            <p className="auth-footer">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </form>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2026 Gas Track. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;