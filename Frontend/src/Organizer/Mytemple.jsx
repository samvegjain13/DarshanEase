import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../api';
import Onavbar from './Onavbar';
import { Link } from 'react-router-dom';

const Mytemple = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.get(`${API_BASE}/organizer/gettemple/${user.id}`)
        .then((response) => setItems(response.data))
        .catch((error) => console.error('Error fetching temples: ', error));
    }
  }, []);

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Onavbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>My Temple</h2>
          {items.length > 0 ? (
            <Link to={`/edittemple/${items[0]._id}`} style={{ padding: '10px 24px', background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>Edit Temple</Link>
          ) : (
            <Link to="/createtemple" style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: '#0f0f23', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem' }}>+ Create Temple</Link>
          )}
        </div>

        {items.map((item) => (
          <div key={item._id} style={{ background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.12)', borderRadius: '16px', overflow: 'hidden' }}>
            <img src={`${API_BASE}/organizer/${item.templeImage}`} alt="Temple" style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
            <div style={{ padding: '24px' }}>
              <h3 style={{ color: '#f97316', fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px' }}>{item.templeName}</h3>
              <div style={{ display: 'flex', gap: '24px', marginBottom: '12px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>🕐 Open: {item.open}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>🕐 Close: {item.close}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '12px' }}>📍 {item.location}</p>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.7' }}>{item.description?.slice(0, 300)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mytemple;
