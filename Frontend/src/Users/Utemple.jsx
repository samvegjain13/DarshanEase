import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Unavbar from './Unavbar';
import API_BASE, { getImageUrl } from '../api';

const Utemple = () => {
  const [item, setItem] = useState(null);
  const [darshan, setDarshan] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${API_BASE}/organizer/gettemplebyid/${id}`)
      .then((resp) => {
        setItem(resp.data);
        const organizerId = resp.data.organizerId;
        axios.get(`${API_BASE}/organizer/getdarshans/${organizerId}`)
          .then((response) => setDarshan(response.data))
          .catch((error) => console.error('Error fetching darshan: ', error));
      })
      .catch(() => console.log("Did not get data"));
  }, [id]);

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Unavbar />
      {item && (
        <div>
          <div style={{ position: 'relative', height: '350px', overflow: 'hidden' }}>
            <img src={`${getImageUrl(item?.templeImage)}`} alt="Temple" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f0f23, transparent)', display: 'flex', alignItems: 'flex-end', padding: '40px' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item.templeName}</h1>
            </div>
          </div>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
            <div style={{ background: 'rgba(26, 26, 46, 0.6)', border: '1px solid rgba(249, 115, 22, 0.12)', borderRadius: '16px', padding: '28px' }}>
              <h3 style={{ color: '#f97316', fontWeight: '600', marginBottom: '16px', fontSize: '1.2rem' }}>📜 Description</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '0.95rem' }}>{item.description}</p>
            </div>
            <div style={{ background: 'rgba(26, 26, 46, 0.6)', border: '1px solid rgba(249, 115, 22, 0.12)', borderRadius: '16px', padding: '28px' }}>
              <h3 style={{ color: '#f97316', fontWeight: '600', marginBottom: '16px', fontSize: '1.2rem' }}>ℹ Info</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '8px' }}>🕐 Open: {item.open}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '8px' }}>🕐 Close: {item.close}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '8px' }}>🏛 Organizer: {item.organizerName}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>📍 {item.location}</p>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px 60px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '32px' }}>Available Darshans</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {darshan.map((d) => (
            <div key={d._id} style={{ background: 'rgba(26, 26, 46, 0.6)', border: '1px solid rgba(249, 115, 22, 0.12)', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ color: '#f1f5f9', fontSize: '1.15rem', fontWeight: '700', marginBottom: '12px' }}>{d.darshanName}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '4px' }}>🕐 Timing: {d.open} - {d.close}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '4px' }}>🎟 Normal: ₹{d.prices?.normal}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>💎 VIP: ₹{d.prices?.vip}</p>
              <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '16px' }}>{d.description?.slice(0, 150)}...</p>
              <Link to={`/bookdarshan/${d._id}`} style={{ display: 'inline-block', padding: '10px 24px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: '#0f0f23', fontWeight: '700', fontSize: '0.9rem', borderRadius: '10px', textDecoration: 'none' }}>
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Utemple;
