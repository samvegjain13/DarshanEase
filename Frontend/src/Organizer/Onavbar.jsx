import React from 'react';
import { Link } from 'react-router-dom';

const navStyle = {
  background: 'linear-gradient(90deg, #0f0f23, #1a1a2e, #0f0f23)',
  padding: '12px 32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(249, 115, 22, 0.15)',
  position: 'sticky', top: 0, zIndex: 100,
  backdropFilter: 'blur(20px)',
};
const linkStyle = { color: '#94a3b8', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.3s' };

const Onavbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <nav style={navStyle}>
      <Link to='/ohome' style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '1.3rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🏛 DarshanEase <span style={{ fontSize: '0.8rem', color: '#64748b' }}>(Organizer)</span></span>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Link to="/ohome" style={linkStyle}>Dashboard</Link>
        <Link to="/mytemple" style={linkStyle}>My Temple</Link>
        <Link to="/odarshans" style={linkStyle}>Darshans</Link>
        <Link to="/bookings" style={linkStyle}>Bookings</Link>
        <Link to="/" style={{ ...linkStyle, color: '#f97316' }}>Logout</Link>
        {user && <span style={{ color: '#f59e0b', fontWeight: '600', marginLeft: '8px', fontSize: '0.9rem' }}>🏛 {user.name}</span>}
      </div>
    </nav>
  );
};

export default Onavbar;
