import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Onavbar from './Onavbar';
import moment from 'moment';
import 'moment-timezone';

const inputStyle = { width: '100%', padding: '12px 16px', background: 'rgba(15, 15, 35, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '12px', color: '#f1f5f9', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '500', marginBottom: '6px' };

function CreatedDarshan() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ description: '', darshanName: '', open: '', close: '', prices: { normal: '', vip: '' } });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:7000/organizer/gettemple/${user.id}`)
        .then((response) => setItems(response.data))
        .catch(console.error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('prices')) {
      const newPrices = formData.prices ? { ...formData.prices } : {};
      newPrices[name.split('.')[1]] = value;
      setFormData({ ...formData, prices: newPrices });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData, organizerName: user.name, organizerId: user.id,
        templeName: items[0]?.templeName, location: items[0]?.location, templeImage: items[0]?.templeImage,
        open: moment.tz(formData.open, 'HH:mm', 'Asia/Kolkata').format('hh:mm A'),
        close: moment.tz(formData.close, 'HH:mm', 'Asia/Kolkata').format('hh:mm A'),
      };
      await axios.post('http://localhost:7000/organizer/createdarshan', dataToSend);
      alert('Darshan added successfully');
      navigate('/odarshans');
    } catch (error) { console.error('Error adding darshan: ', error); }
  };

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Onavbar />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: '520px', background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '24px', padding: '36px', backdropFilter: 'blur(20px)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '28px', textAlign: 'center' }}>Create Darshan</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}><label style={labelStyle}>Darshan Name</label><input type="text" name="darshanName" value={formData.darshanName} onChange={handleChange} required style={inputStyle} placeholder="Darshan name" /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div><label style={labelStyle}>Open</label><input type="time" name="open" value={formData.open} onChange={handleChange} required style={inputStyle} /></div>
              <div><label style={labelStyle}>Close</label><input type="time" name="close" value={formData.close} onChange={handleChange} required style={inputStyle} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div><label style={labelStyle}>Normal Price (₹)</label><input type="text" name="prices.normal" value={formData.prices.normal} onChange={handleChange} required style={inputStyle} placeholder="e.g. 100" /></div>
              <div><label style={labelStyle}>VIP Price (₹)</label><input type="text" name="prices.vip" value={formData.prices.vip} onChange={handleChange} required style={inputStyle} placeholder="e.g. 500" /></div>
            </div>
            <div style={{ marginBottom: '24px' }}><label style={labelStyle}>Description</label><textarea name="description" value={formData.description} onChange={handleChange} required style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} placeholder="Description" /></div>
            <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: '#0f0f23', fontWeight: '700', fontSize: '1rem', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>Create Darshan</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatedDarshan;
