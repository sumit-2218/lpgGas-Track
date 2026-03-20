import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import './CustomerDashboard.css';

function CustomerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchBookings(storedUser.id);
    }
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const res = await API.get(`/user/bookings/${userId}`);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="navbar-left"><h2>Gas Track</h2></div>
        <div className="navbar-right">
          <span>Welcome, {user.name}</span> | <span>{user.email}</span>
          <button className="action-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-container">
        {/* Book Cylinder Card */}
        <div className="dashboard-card">
          <h2>Book a Cylinder</h2>
          <p>Quickly book a new LPG cylinder with your preferred size and quantity.</p>
          <Link to="/book">
            <button className="action-btn">Book Cylinder</button>
          </Link>
        </div>

        {/* Track Orders Card */}
        <div className="dashboard-card">
          <h2>Track Order Status</h2>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <div className="table-wrapper">
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                    <th>Cylinder Size</th>
                    <th>Quantity</th>
                    <th>Name</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td>{new Date(b.booking_time).toLocaleString()}</td>
                      <td>{b.status}</td>
                      <td>{b.cylinder_size}</td>
                      <td>{b.quantity}</td>
                      <td>{b.customerName}</td>
                      <td>{b.customerAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;