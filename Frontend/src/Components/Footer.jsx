import React from 'react';

const Footer = () => {
  return (
    <div id='contact'>
      <footer style={{
        background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f23 100%)',
        padding: '50px 20px 30px',
        textAlign: 'center',
        borderTop: '1px solid rgba(249, 115, 22, 0.15)',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #f97316, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
          }}>🕉 DarshanEase</h3>

          <p style={{
            color: '#64748b',
            fontSize: '1rem',
            lineHeight: '1.7',
            marginBottom: '24px',
            fontStyle: 'italic',
          }}>
            "Embark on a Spiritual Journey, One Darshan at a Time – Seamless Temple Darshan Ticket Booking at Your Fingertips!"
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            <div style={{
              background: 'rgba(26, 26, 46, 0.6)',
              border: '1px solid rgba(249, 115, 22, 0.15)',
              borderRadius: '12px',
              padding: '16px 24px',
            }}>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 4px' }}>📞 Call Us</p>
              <p style={{ color: '#f1f5f9', fontWeight: '600', margin: 0 }}>127-865-586-67</p>
            </div>
            <div style={{
              background: 'rgba(26, 26, 46, 0.6)',
              border: '1px solid rgba(249, 115, 22, 0.15)',
              borderRadius: '12px',
              padding: '16px 24px',
            }}>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 4px' }}>✉ Email</p>
              <p style={{ color: '#f1f5f9', fontWeight: '600', margin: 0 }}>info@darshanease.com</p>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '20px',
          }}>
            <p style={{ color: '#475569', fontSize: '0.85rem', margin: 0 }}>
              Copyright © {new Date().getFullYear()} DarshanEase. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;