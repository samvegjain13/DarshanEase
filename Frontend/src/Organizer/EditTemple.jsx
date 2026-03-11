import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import Onavbar from './Onavbar';

const inputStyle = { width: '100%', padding: '12px 16px', background: 'rgba(15, 15, 35, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '12px', color: '#f1f5f9', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '500', marginBottom: '6px' };

function EditTemple() {
  const [formData, setFormData] = useState({ description: '', templeName: '', open: '', close: '', location: '', templeImage: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/organizer/gettemplebyid/${id}`)
      .then(response => {
        const d = response.data;
        setFormData({ description: d.description, templeName: d.templeName, open: d.open, close: d.close, location: d.location });
      })
      .catch(error => console.error('Error fetching temple: ', error));
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === 'templeImage') setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('templeName', formData.templeName);
      fd.append('open', formData.open);
      fd.append('close', formData.close);
      fd.append('description', formData.description);
      fd.append('location', formData.location);
      fd.append('templeImage', formData.templeImage);
      await axios.put(`${API_BASE}/organizer/updatetemple/${id}`, fd);
      alert('Temple updated successfully');
      navigate('/mytemple');
    } catch (error) { console.error('Error updating temple: ', error); }
  };

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Onavbar />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: '520px', background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '24px', padding: '36px', backdropFilter: 'blur(20px)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '28px', textAlign: 'center' }}>Update Temple</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}><label style={labelStyle}>Temple Name</label><input type="text" name="templeName" value={formData.templeName} onChange={handleChange} required style={inputStyle} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div><label style={labelStyle}>Open</label><input type="time" name="open" value={formData.open} onChange={handleChange} required style={inputStyle} /></div>
              <div><label style={labelStyle}>Close</label><input type="time" name="close" value={formData.close} onChange={handleChange} required style={inputStyle} /></div>
            </div>
            <div style={{ marginBottom: '16px' }}><label style={labelStyle}>Address</label><input type="text" name="location" value={formData.location} onChange={handleChange} required style={inputStyle} /></div>
            <div style={{ marginBottom: '16px' }}><label style={labelStyle}>Description</label><textarea name="description" value={formData.description} onChange={handleChange} required style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} /></div>
            <div style={{ marginBottom: '24px' }}><label style={labelStyle}>Update Image</label><input type="file" name="templeImage" accept="image/*" onChange={handleChange} style={{ ...inputStyle, padding: '10px' }} /></div>
            <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: '#0f0f23', fontWeight: '700', fontSize: '1rem', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>Update Temple</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTemple;
