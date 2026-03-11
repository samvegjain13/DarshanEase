import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

function Ahome() {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [temples, setTemples] = useState([]);
  const [darshans, setDarshans] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:7000/user/users`).then(r => setUsers(r.data)).catch(console.error);
    axios.get(`http://localhost:7000/organizer/organizers`).then(r => setVendors(r.data)).catch(console.error);
    axios.get(`http://localhost:7000/organizer/gettemples`).then(r => setTemples(r.data)).catch(console.error);
    axios.get(`http://localhost:7000/organizer/getdarshans`).then(r => setDarshans(r.data)).catch(console.error);
    axios.get(`http://localhost:7000/user/getbookings`).then(r => setOrders(r.data)).catch(console.error);
  }, []);

  const stats = [
    { label: 'Users', value: users.length, color: '#8b5cf6', icon: '👤', link: '/users' },
    { label: 'Organizers', value: vendors.length, color: '#06b6d4', icon: '🏛', link: '/organizers' },
    { label: 'Temples', value: temples.length, color: '#f97316', icon: '⛩', link: '/organizers' },
    { label: 'Darshans', value: darshans.length, color: '#f59e0b', icon: '🙏', link: '/organizers' },
    { label: 'Bookings', value: orders.length, color: '#22c55e', icon: '🎟', link: '/users' },
  ];

  const data = stats.map(s => ({ name: s.label, value: s.value, fill: s.color }));

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Anavbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '32px', textAlign: 'center' }}>Admin Dashboard</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {stats.map((s, i) => (
            <Link key={i} to={s.link} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.12)', borderRadius: '16px', padding: '20px', textAlign: 'center', transition: 'all 0.3s' }}>
                <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '6px', marginBottom: '2px' }}>{s.label}</p>
                <p style={{ color: s.color, fontSize: '1.8rem', fontWeight: '800', margin: 0 }}>{s.value}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ background: 'rgba(26, 26, 46, 0.6)', borderRadius: '16px', padding: '32px', border: '1px solid rgba(249, 115, 22, 0.1)' }}>
          <h3 style={{ color: '#f1f5f9', marginBottom: '20px', textAlign: 'center' }}>System Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}><XAxis dataKey="name" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '8px' }} /><Legend /><Bar dataKey="value" barSize={50} /></BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Ahome;
