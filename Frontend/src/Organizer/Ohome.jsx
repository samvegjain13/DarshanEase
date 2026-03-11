import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Onavbar from './Onavbar';

function Ohome() {
  const [temples, setTemples] = useState([]);
  const [darshans, setDarshans] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.get(`http://localhost:7000/organizer/gettemple/${user.id}`).then(r => setTemples(r.data)).catch(console.error);
      axios.get(`http://localhost:7000/organizer/getdarshans/${user.id}`).then(r => setDarshans(r.data)).catch(console.error);
      axios.get(`http://localhost:7000/organizer/getorganizerbookings/${user.id}`).then(r => setBookings(r.data)).catch(console.error);
    }
  }, []);

  const stats = [
    { label: 'Temples', value: temples.length, color: '#06b6d4', icon: '🏛', link: '/mytemple' },
    { label: 'Darshans', value: darshans.length, color: '#f59e0b', icon: '🙏', link: '/odarshans' },
    { label: 'Bookings', value: bookings.length, color: '#22c55e', icon: '🎟', link: '/bookings' },
  ];

  const data = stats.map(s => ({ name: s.label, value: s.value, fill: s.color }));

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Onavbar />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '32px', textAlign: 'center' }}>Dashboard</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
          {stats.map((s, i) => (
            <Link key={i} to={s.link} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.12)', borderRadius: '16px', padding: '24px', textAlign: 'center', transition: 'all 0.3s' }}>
                <span style={{ fontSize: '2rem' }}>{s.icon}</span>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '8px', marginBottom: '4px' }}>{s.label}</p>
                <p style={{ color: s.color, fontSize: '2rem', fontWeight: '800', margin: 0 }}>{s.value}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ background: 'rgba(26, 26, 46, 0.6)', borderRadius: '16px', padding: '32px', border: '1px solid rgba(249, 115, 22, 0.1)' }}>
          <h3 style={{ color: '#f1f5f9', marginBottom: '20px', textAlign: 'center' }}>Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}><XAxis dataKey="name" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '8px' }} /><Legend /><Bar dataKey="value" barSize={50} /></BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Ohome;
