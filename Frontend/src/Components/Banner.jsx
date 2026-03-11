import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div style={{ marginTop: '10px' }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '500px',
        overflow: 'hidden',
        borderRadius: '0 0 24px 24px',
        margin: '0 20px',
      }}>
        <img
          src="https://www.oyorooms.com/blog/wp-content/uploads/2017/10/Feature-Image-min-2-1.jpg"
          alt="Temple Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.4)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15,15,35,1) 0%, rgba(15,15,35,0.4) 50%, rgba(15,15,35,0.2) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px',
        }}>
          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #f97316, #f59e0b, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Divine Darshan,<br />At Your Fingertips
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: '#94a3b8',
            maxWidth: '600px',
            marginBottom: '32px',
            lineHeight: '1.7',
          }}>
            Book temple darshan tickets online. Skip the queues, plan your spiritual journey, and experience the divine with ease.
          </p>
          <Link to="/utemples" style={{
            padding: '14px 40px',
            background: 'linear-gradient(135deg, #f97316, #f59e0b)',
            color: '#0f0f23',
            fontWeight: '700',
            fontSize: '1rem',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)',
          }}>
            Book Now →
          </Link>
        </div>
      </div>

      {/* Marquee */}
      <div className='class3'>
        <div className="marquee-container" style={{ marginTop: '16px', borderRadius: '12px', margin: '16px 20px 0' }}>
          <div className="marquee-text">
            <p style={{ color: '#0f0f23', fontWeight: '700' }}>
              🕉 Book your tickets for Temple Darshan now! Limited slots available. Don't miss the divine experience. 🕉 Online booking available 24/7 for all major temples across India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;