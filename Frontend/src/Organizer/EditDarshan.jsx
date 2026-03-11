import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Onavbar from './Onavbar';

const inputStyle = { width: '100%', padding: '12px 16px', background: 'rgba(15, 15, 35, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '12px', color: '#f1f5f9', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.3s' };

function EditDarshan() {
  const [formData, setFormData] = useState({ darshanName: '', open: '', close: '', vip: '', normal: '', description: '', prices: { vip: '', normal: '' }, templeName: '', location: '' });
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:7000/organizer/getdarshan/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          darshanName: data.darshanName || '',
          open: data.open || '',
          close: data.close || '',
          vip: data.vip || '',
          normal: data.normal || '',
          description: data.description || '',
          prices: {
            vip: data.prices?.vip || '',
            normal: data.prices?.normal || ''
          },
          templeName: data.templeName || '',
          location: data.location || ''
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === 'vipPrice' || e.target.name === 'normalPrice') {
      const priceType = e.target.name === 'vipPrice' ? 'vip' : 'normal';
      setFormData({ ...formData, prices: { ...formData.prices, [priceType]: e.target.value } });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'prices') {
        data.append('prices[vip]', formData.prices.vip);
        data.append('prices[normal]', formData.prices.normal);
      } else {
        data.append(key, formData[key]);
      }
    });
    if (file) data.append('templeImage', file);

    try {
      await axios.put(`http://localhost:7000/organizer/updatedarshan/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Darshan updated successfully');
      navigate('/odarshans');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh', paddingBottom: '60px' }}>
      <Onavbar />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '24px', padding: '40px', backdropFilter: 'blur(20px)' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '24px', textAlign: 'center' }}>Edit Darshan</h2>
          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Darshan Name</label>
              <input type="text" name="darshanName" value={formData.darshanName} onChange={handleChange} style={inputStyle} required />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Open Time</label><input type="time" name="open" value={formData.open} onChange={handleChange} style={inputStyle} required /></div>
              <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Close Time</label><input type="time" name="close" value={formData.close} onChange={handleChange} style={inputStyle} required /></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Normal Ticket Price (₹)</label><input type="number" name="normalPrice" value={formData.prices.normal} onChange={handleChange} style={inputStyle} required /></div>
              <div><label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>VIP Ticket Price (₹)</label><input type="number" name="vipPrice" value={formData.prices.vip} onChange={handleChange} style={inputStyle} required /></div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" style={{ ...inputStyle, resize: 'vertical' }} required></textarea>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Image (optional)</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ ...inputStyle, padding: '9px 16px' }} />
            </div>

            <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: '#0f0f23', fontWeight: '700', fontSize: '1rem', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)' }}>Update Darshan</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditDarshan;
