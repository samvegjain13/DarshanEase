import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE, { getImageUrl } from '../api';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

const Users = () => {
  const [userbookings, setUserbookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/user/users`)
      .then((response) => setUsers(response.data))
      .catch(console.error);
  }, []);

  const deleteData = (taskId) => {
    axios.delete(`${API_BASE}/user/userdelete/${taskId}`);
    window.location.assign('/users');
    alert('User deleted');
  };

  const deleteorder = (taskId) => {
    axios.delete(`${API_BASE}/user/userbookingdelete/${taskId}`);
    window.location.assign('/users');
    alert('Deleted');
  };

  const fetchUserBookings = (userId) => {
    axios.get(`${API_BASE}/user/getbookings/${userId}`)
      .then((response) => { setUserbookings(response.data); setShowDetails(true); })
      .catch(console.error);
  };

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Anavbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '32px' }}>Users</h2>
        <div style={{ background: 'rgba(26, 26, 46, 0.6)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(249, 115, 22, 0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(249, 115, 22, 0.15)' }}>
                {['#', 'User ID', 'Name', 'Email', 'Actions'].map((h, i) => (
                  <th key={i} style={{ padding: '14px 16px', color: '#f97316', fontSize: '0.85rem', fontWeight: '600', textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={item._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>{index + 1}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '0.8rem' }}>{item._id.slice(0, 12)}...</td>
                  <td style={{ padding: '12px 16px', color: '#f1f5f9', fontSize: '0.9rem', fontWeight: '500' }}>{item.name}</td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>{item.email}</td>
                  <td style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
                    <Link to={`/useredit/${item._id}`} style={{ padding: '6px 12px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', fontSize: '0.8rem', textDecoration: 'none' }}>✏ Edit</Link>
                    <button onClick={() => deleteData(item._id)} style={{ padding: '6px 12px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>🗑 Delete</button>
                    <button onClick={() => fetchUserBookings(item._id)} style={{ padding: '6px 12px', background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>👁 View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDetails && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#1a1a2e', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: '20px', padding: '32px', maxHeight: '80vh', overflowY: 'auto', width: '100%', maxWidth: '900px' }}>
            <h3 style={{ color: '#f97316', fontWeight: '700', marginBottom: '20px', textAlign: 'center' }}>User Bookings</h3>
            {userbookings.map((item) => (
              <div key={item._id} style={{ background: 'rgba(15, 15, 35, 0.8)', borderRadius: '12px', padding: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', border: '1px solid rgba(249, 115, 22, 0.08)' }}>
                <img src={`${getImageUrl(item?.templeImage)}`} alt="Temple" style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
                  <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Temple</p><p style={{ color: '#f1f5f9', fontSize: '0.8rem', margin: 0 }}>{item.templeName}</p></div>
                  <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Darshan</p><p style={{ color: '#f1f5f9', fontSize: '0.8rem', margin: 0 }}>{item.darshanName}</p></div>
                  <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Date</p><p style={{ color: '#f1f5f9', fontSize: '0.8rem', margin: 0 }}>{item.BookingDate}</p></div>
                  <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Qty</p><p style={{ color: '#f1f5f9', fontSize: '0.8rem', margin: 0 }}>{item.quantity}</p></div>
                  <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>Amount</p><p style={{ color: '#f97316', fontWeight: '700', fontSize: '0.85rem', margin: 0 }}>₹{item.totalamount}</p></div>
                </div>
                <button onClick={() => deleteorder(item._id)} style={{ padding: '6px 12px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>🗑</button>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button onClick={() => setShowDetails(false)} style={{ padding: '10px 32px', background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
