import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './BookingPage.css'; // new CSS file for modern UI

function BookingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cylinderSize, setCylinderSize] = useState('5kg');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setCustomerName(storedUser.name || '');
      setCustomerAddress(storedUser.address || '');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('User not logged in.');
      return;
    }

    if (!quantity || quantity < 1) {
      setError('Please enter a valid quantity.');
      return;
    }

    const payload = {
      userId: user.id,
      cylinderSize,
      quantity,
      customerName,
      customerAddress
    };

    console.log('Booking payload:', payload);

    try {
      const res = await API.post('/user/book', payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Booking response:', res.data);
      alert('Booking created successfully!');
      navigate('/customer');
    } catch (err) {
      console.error('Booking error:', err.response || err);
      if (err.response && err.response.data) {
        setError(`Failed to book cylinder: ${JSON.stringify(err.response.data)}`);
      } else {
        setError('Failed to book cylinder. Check console for details.');
      }
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="booking-page-container">
      <div className="booking-card">
        <h1>Book a Cylinder</h1>
        <p className="subtitle">Select cylinder size and quantity to create a new booking</p>
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Cylinder Size</label>
            <select value={cylinderSize} onChange={(e) => setCylinderSize(e.target.value)}>
              <option value="5kg">5kg</option>
              <option value="14.2kg">14.2kg</option>
              <option value="19kg">19kg</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </div>

          {error && <span className="error">{error}</span>}

          <button type="submit" className="auth-btn">Book Cylinder</button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;