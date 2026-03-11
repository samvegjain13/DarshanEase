import React from 'react';
import './navbar.css';

const About = () => {
  const features = [
    { icon: '🏛', title: 'All Major Temples', text: 'Major temples across India implementing the Darshan Token / E-Queue / Ticket Booking system.' },
    { icon: '🛡', title: 'Crowd Management', text: 'Social distancing, crowd control, and contact tracing with minimum physical interaction.' },
    { icon: '🌐', title: 'Online Advance Booking', text: 'For devotees with internet access, especially those coming from far-off places.' },
    { icon: '🎫', title: 'On-the-Spot Tokens', text: 'Instant darshan token issuance for local devotees at the temple premises.' },
    { icon: '📊', title: 'Detailed Reports', text: 'Daily reports for gatekeepers and periodical reports for management review.' },
    { icon: '🔬', title: 'Research-Based', text: 'Developed after thorough research and consultation with major temples across India.' },
  ];

  return (
    <div id='about' style={{ padding: '60px 20px' }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '2.2rem',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #f97316, #f59e0b)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '12px',
      }}>About DarshanEase</h2>
      <p style={{
        textAlign: 'center',
        color: '#64748b',
        marginBottom: '40px',
        fontSize: '1rem',
        maxWidth: '600px',
        margin: '0 auto 40px',
      }}>Our system has been enhanced after discussion with a few major temples across India</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {features.map((item, idx) => (
          <div key={idx} style={{
            background: 'rgba(26, 26, 46, 0.6)',
            border: '1px solid rgba(249, 115, 22, 0.1)',
            borderRadius: '16px',
            padding: '24px',
            transition: 'all 0.3s ease',
            cursor: 'default',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '2rem', marginBottom: '12px', display: 'block' }}>{item.icon}</span>
            <h3 style={{ color: '#f1f5f9', fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;