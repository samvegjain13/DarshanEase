import React from 'react';
import './navbar.css';

const Services = () => {
  const services = [
    { icon: '🕐', title: 'Darshan Timings', text: 'Explore the divine experience with regular darshan timings. Witness the spiritual aura and seek blessings from the divine deities.' },
    { icon: '🙏', title: 'Special Pooja Services', text: 'Elevate your spiritual journey with special pooja services. Immerse yourself in sacred rituals and receive blessings.' },
    { icon: '🎟', title: 'Online Ticket Booking', text: 'Conveniently book your darshan tickets online. Save time and ensure a seamless entry to the temple premises.' },
    { icon: '💎', title: 'VIP Darshan', text: 'Experience priority darshan with our VIP services. Skip the regular queue and enjoy a personalized spiritual experience.' },
  ];

  return (
    <div className='services-container' id='services'>
      <h2 className='services-heading'>Our Services</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {services.map((item, idx) => (
          <div key={idx} className='service' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
