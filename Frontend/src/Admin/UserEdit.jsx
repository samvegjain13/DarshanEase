import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Anavbar from './Anavbar';

const inputStyle = { width: '100%', padding: '12px 16px', background: 'rgba(15, 15, 35, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '12px', color: '#f1f5f9', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '500', marginBottom: '6px' };

const UserEdit = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:7000/user/users/${id}`)
      .then(r => setUser(r.data))
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/user/useredit/${id}`, user);
      alert('User updated successfully');
      navigate('/users');
    } catch (error) { console.error(error); }
  };

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Anavbar />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: '420px', background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '24px', padding: '36px', backdropFilter: 'blur(20px)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '28px', textAlign: 'center' }}>Update User</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}><label style={labelStyle}>Name</label><input type="text" name="name" value={user.name} onChange={handleChange} required style={inputStyle} /></div>
            <div style={{ marginBottom: '16px' }}><label style={labelStyle}>Email</label><input type="email" name="email" value={user.email} onChange={handleChange} required style={inputStyle} /></div>
            <div style={{ marginBottom: '24px' }}><label style={labelStyle}>Password</label><input type="text" name="password" value={user.password} onChange={handleChange} required style={inputStyle} /></div>
            <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f97316, #f59e0b)', color: '#0f0f23', fontWeight: '700', fontSize: '1rem', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
