import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../api';

const Osignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE}/organizer/osignup`, { name, email, password })
      .then(() => { alert('Account created'); navigate('/ologin'); })
      .catch(() => alert("Failed to create an account"));
  };

  const inputStyle = { width: '100%', padding: '12px 16px', background: 'rgba(15, 15, 35, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '12px', color: '#f1f5f9', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '500', marginBottom: '6px' };

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f23', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <Link to="/" style={{ position: 'fixed', top: '24px', left: '24px', color: '#f97316', fontSize: '1rem', textDecoration: 'none', fontWeight: '600' }}>← Back</Link>
      <div style={{ width: '100%', maxWidth: '420px', background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '24px', padding: '48px 36px', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '2.5rem' }}>🏛</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginTop: '12px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Organizer Signup</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>Register as a temple organizer</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}><label style={labelStyle}>Full Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={inputStyle} onFocus={e => e.target.style.borderColor = '#f97316'} onBlur={e => e.target.style.borderColor = 'rgba(249, 115, 22, 0.15)'} /></div>
          <div style={{ marginBottom: '20px' }}><label style={labelStyle}>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} onFocus={e => e.target.style.borderColor = '#f97316'} onBlur={e => e.target.style.borderColor = 'rgba(249, 115, 22, 0.15)'} /></div>
          <div style={{ marginBottom: '28px' }}><label style={labelStyle}>Password</label><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} onFocus={e => e.target.style.borderColor = '#f97316'} onBlur={e => e.target.style.borderColor = 'rgba(249, 115, 22, 0.15)'} /></div>
          <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: '#0f0f23', fontWeight: '700', fontSize: '1rem', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)' }}>Sign Up</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#64748b', fontSize: '0.9rem' }}>Already have an account? <Link to="/ologin" style={{ color: '#f97316', fontWeight: '600' }}>Login</Link></p>
      </div>
    </div>
  );
};

export default Osignup;
