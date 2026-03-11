import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Onavbar from './Onavbar';
import { Link } from 'react-router-dom';

const Odarshans = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.get(`http://localhost:7000/organizer/getdarshans/${user.id}`)
        .then((response) => setItems(response.data))
        .catch((error) => console.error('Error fetching darshans: ', error));
    }
  }, []);

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Onavbar />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>My Darshans</h2>
          <Link to="/createdarshan" style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: '#0f0f23', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem' }}>+ Create Darshan</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {items.map((item) => (
            <div key={item._id} style={{ background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.12)', borderRadius: '16px', padding: '24px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{ color: '#f97316', fontSize: '1.15rem', fontWeight: '700', margin: 0 }}>{item.darshanName}</h3>
                <Link to={`/editdarshan/${item._id}`} style={{ padding: '6px 16px', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '8px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', transition: 'all 0.3s ease' }}>Edit</Link>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '4px' }}>🕐 {item.open} - {item.close}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '4px' }}>🎟 Normal: ₹{item.prices?.normal}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>💎 VIP: ₹{item.prices?.vip}</p>
              <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.6' }}>{item.description?.slice(0, 200)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Odarshans;
