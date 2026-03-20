import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "CUSTOMER"
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.role) {
      setError("Please select a role");
      return;
    }

    try {
      const res = await API.post("/auth/register", user);
      alert("Registered Successfully ✅");
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration Failed ❌");
    }
  };

  return (
    <div className="register-page">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">Gas Track</div>
          <div className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/login" className="nav-btn">Login</a>
          </div>
        </div>
      </nav>

      <div className="auth-container">
        <div className="auth-card">
          <h1>Create Account</h1>
          <p>Join now to start ordering LPG cylinders</p>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <input
                name="name"
                placeholder="Full Name"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={user.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                name="address"
                placeholder="Address"
                value={user.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="CUSTOMER">Customer</option>
                <option value="DISTRIBUTOR">Distributor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-btn">Create Account</button>

            {error && <span className="error">{error}</span>}
          </form>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2026 Gas Track. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Register;