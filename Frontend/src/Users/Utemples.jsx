import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Unavbar from './Unavbar';
import API_BASE from '../api';

const cardStyle = { background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.12)', borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s ease' };

const Utemples = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/organizer/gettemples/`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching temples: ', error));
  }, []);

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Unavbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '32px' }}>All Temples</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {items.map((item) => (
            <div key={item._id} style={cardStyle}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src={`${API_BASE}/organizer/${item.templeImage}`} alt="Temple" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ color: '#f97316', fontSize: '1.15rem', fontWeight: '700', marginBottom: '12px' }}>{item.templeName}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>🕐 Open: {item.open}</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>🕐 Close: {item.close}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px' }}>📍 {item.location}</p>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '16px' }}>{item.description?.slice(0, 200)}...</p>
                <Link to={`/utemple/${item._id}`} style={{ display: 'inline-block', padding: '10px 24px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: '#0f0f23', fontWeight: '700', fontSize: '0.9rem', borderRadius: '10px', textDecoration: 'none' }}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Utemples;
