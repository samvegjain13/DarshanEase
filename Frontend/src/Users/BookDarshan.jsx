import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import Unavbar from './Unavbar';

const inputStyle = { width: '100%', padding: '12px 16px', background: 'rgba(15, 15, 35, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '12px', color: '#f1f5f9', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' };

function BookDarshan() {
  const [item, setItem] = useState({});
  const [selectedDarshan, setSelectedDarshan] = useState('normal');
  const [formData, setFormData] = useState({ name: '', email: '', phno: '' });
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/user/darshan/${id}`)
      .then((resp) => setItem(resp.data))
      .catch((error) => console.log("Failed to fetch:", error));
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!item?.organizerName || !item?.prices) throw new Error('Missing data');
      const { organizerName, description, prices, darshanName, templeName, location, templeImage, organizerId, close, open } = item;
      const totalAmount = parseInt(prices[selectedDarshan] * quantity, 10) + 49;
      const updatedFormData = { ...formData, quantity, totalamount: totalAmount, organizerName, organizerId, description, templeName, darshanName, location, templeImage, open, close };
      const user = JSON.parse(localStorage.getItem('user'));
      updatedFormData.userId = user.id;
      updatedFormData.userName = user.name;
      await axios.post(`${API_BASE}/user/userbooking`, updatedFormData);
      alert('Booked successfully');
      navigate('/mybookings');
    } catch (error) {
      console.error('Error booking:', error);
    }
  };

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Unavbar />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: '480px', background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '24px', padding: '36px', backdropFilter: 'blur(20px)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>Complete Your Booking</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>{item.darshanName} • {item.templeName}</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} placeholder="Your name" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Email</label><input type="text" name="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="Email" /></div>
              <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Phone</label><input type="text" name="phno" value={formData.phno} onChange={handleChange} style={inputStyle} placeholder="Phone" /></div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Darshan Type</label>
              <select value={selectedDarshan} onChange={(e) => setSelectedDarshan(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="normal">Normal Darshan</option>
                <option value="vip">VIP Darshan</option>
              </select>
            </div>

            {item?.prices && (
              <div style={{ background: 'rgba(15, 15, 35, 0.5)', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid rgba(249, 115, 22, 0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Quantity</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button type="button" onClick={() => quantity > 1 && setQuantity(quantity - 1)} style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', cursor: 'pointer', fontWeight: '700', fontSize: '1.1rem' }}>−</button>
                    <span style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '1.1rem', minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
                    <button type="button" onClick={() => setQuantity(quantity + 1)} style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', cursor: 'pointer', fontWeight: '700', fontSize: '1.1rem' }}>+</button>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#64748b' }}>Price</span><span style={{ color: '#f1f5f9' }}>₹{quantity * item.prices[selectedDarshan]}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#64748b' }}>Convenience Fee</span><span style={{ color: '#f1f5f9' }}>₹45</span></div>
                <div style={{ borderTop: '1px solid rgba(249, 115, 22, 0.15)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#f97316', fontWeight: '700' }}>Total</span><span style={{ color: '#f97316', fontWeight: '700', fontSize: '1.1rem' }}>₹{parseInt(quantity * item.prices[selectedDarshan]) + 45}</span></div>
              </div>
            )}

            <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: '#0f0f23', fontWeight: '700', fontSize: '1rem', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)' }}>Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookDarshan;
