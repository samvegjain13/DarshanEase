import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Onavbar from './Onavbar';
import moment from 'moment';

const inputStyle = { width: '100%', padding: '12px 16px', background: 'rgba(15, 15, 35, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '12px', color: '#f1f5f9', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '500', marginBottom: '6px' };

function CreateTemple() {
  const [formData, setFormData] = useState({ description: '', templeName: '', open: '', close: '', location: '' });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    if (e.target.name === 'templeImage') setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('templeName', formData.templeName);
      fd.append('open', moment(formData.open, 'HH:mm').format('hh:mm A'));
      fd.append('close', moment(formData.close, 'HH:mm').format('hh:mm A'));
      fd.append('description', formData.description);
      fd.append('location', formData.location);
      fd.append('templeImage', formData.templeImage);
      fd.append('organizerName', user.name);
      fd.append('organizerId', user.id);
      await axios.post('http://localhost:7000/organizer/createtemple', fd);
      alert('Temple added successfully');
      navigate('/mytemple');
    } catch (error) { console.error('Error adding temple: ', error); }
  };

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Onavbar />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: '520px', background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '24px', padding: '36px', backdropFilter: 'blur(20px)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '28px', textAlign: 'center' }}>Add Temple</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}><label style={labelStyle}>Temple Name</label><input type="text" name="templeName" value={formData.templeName} onChange={handleChange} required style={inputStyle} placeholder="Temple name" /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div><label style={labelStyle}>Open Time</label><input type="time" name="open" value={formData.open} onChange={handleChange} required style={inputStyle} /></div>
              <div><label style={labelStyle}>Close Time</label><input type="time" name="close" value={formData.close} onChange={handleChange} required style={inputStyle} /></div>
            </div>
            <div style={{ marginBottom: '16px' }}><label style={labelStyle}>Address</label><input type="text" name="location" value={formData.location} onChange={handleChange} required style={inputStyle} placeholder="Temple address" /></div>
            <div style={{ marginBottom: '16px' }}><label style={labelStyle}>Description</label><textarea name="description" value={formData.description} onChange={handleChange} required style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} placeholder="Temple description" /></div>
            <div style={{ marginBottom: '24px' }}><label style={labelStyle}>Temple Image</label><input type="file" name="templeImage" accept="image/*" onChange={handleChange} required style={{ ...inputStyle, padding: '10px' }} /></div>
            <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: '#0f0f23', fontWeight: '700', fontSize: '1rem', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>Create Temple</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTemple;
