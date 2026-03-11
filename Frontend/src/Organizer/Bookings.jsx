import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../api';
import { useNavigate } from 'react-router-dom';
import Onavbar from './Onavbar';

function Bookings() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchBookings(user.id);
    }
  }, []);

  const fetchBookings = (userId) => {
    axios.get(`${API_BASE}/organizer/getorganizerbookings/${userId}`)
      .then((response) => setOrders(response.data))
      .catch((error) => console.error('Error fetching bookings: ', error));
  };

  const handleStatusChange = (id, newStatus) => {
    axios.put(`${API_BASE}/organizer/updatebooking/${id}`, { status: newStatus })
      .then(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        fetchBookings(user.id);
      })
      .catch((err) => console.error('Error updating status', err));
  };

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Onavbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '32px' }}>Bookings</h2>
        {orders.length === 0 && <p style={{ textAlign: 'center', color: '#64748b' }}>No bookings yet</p>}
        {orders.map((item) => (
          <div key={item._id} style={{ background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.12)', borderRadius: '16px', padding: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <img src={`${API_BASE}/organizer/${item?.templeImage}`} alt="Temple" style={{ width: '80px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px' }}>
              <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Temple</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.8rem', margin: 0 }}>{item.templeName}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Darshan</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.8rem', margin: 0 }}>{item.darshanName}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Booking ID</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.8rem', margin: 0 }}>{item._id?.slice(0, 10)}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Devotee</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.8rem', margin: 0 }}>{item.userName}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Date</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.8rem', margin: 0 }}>{item.BookingDate}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Timing</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.8rem', margin: 0 }}>{item.open}-{item.close}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Qty</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.8rem', margin: 0 }}>{item.quantity}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Amount</p><p style={{ color: '#f97316', fontWeight: '700', fontSize: '0.9rem', margin: 0 }}>₹{item.totalamount}</p></div>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Status</p>
                <select 
                  value={item.status || 'Confirmed'} 
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  style={{ background: 'rgba(15,15,35,0.8)', color: '#f1f5f9', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '6px', padding: '4px 8px', fontSize: '0.8rem', outline: 'none', cursor: 'pointer', marginTop: '2px' }}
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
