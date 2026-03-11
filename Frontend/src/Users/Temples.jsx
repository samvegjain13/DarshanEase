import React, { useState } from 'react';
import '../Components/navbar.css';
import { Link } from 'react-router-dom';

const TempleCard = ({ imageSrc, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}
      style={{
        width: '380px', borderRadius: '16px', overflow: 'hidden',
        background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.15)',
        transition: 'all 0.4s ease', transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px rgba(249, 115, 22, 0.15)' : '0 4px 16px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
      }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={imageSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,15,35,0.9) 0%, transparent 60%)' }} />
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '8px' }}>{title}</h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' }}>{description}</p>
      </div>
    </div>
  );
};

const Temples = () => {
  return (
    <div style={{ background: 'rgba(15, 15, 35, 0.5)', paddingBottom: '60px', paddingTop: '60px' }} id='temples'>
      <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '40px' }}>Featured Temples</h2>
      <Link to='/utemples' style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', padding: '0 20px' }}>
          <TempleCard imageSrc="https://d3k1i85mml78tf.cloudfront.net/Blogs/1677258515580_post_image_1.jpg" title="Shri Banke Bihari Ji Mandir" description="Book online darshan at one of Vrindavan's most revered temples." />
          <TempleCard imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Shiv_khori_2.jpg/1200px-Shiv_khori_2.jpg" title="Shiv Khori Mandir" description="Experience the divine at this sacred cave temple." />
          <TempleCard imageSrc="https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg" title="Tirupati Tirumala Temple" description="Book darshan at the world's richest Hindu temple." />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', padding: '24px 20px 0' }}>
          <TempleCard imageSrc="https://imageio.forbes.com/blogs-images/jimdobson/files/2016/05/Sree_Padmanabhaswamy_Temple.jpg?height=459&width=711&fit=bounds" title="Padmanabhaswamy Temple" description="Ancient and sacred temple in Kerala." />
          <TempleCard imageSrc="https://upload.wikimedia.org/wikipedia/commons/e/e4/Sai_baba_samadhi_mandir_.jpg" title="Shirdi Sai Baba Mandir" description="Seek blessings at the samadhi temple of Sai Baba." />
          <TempleCard imageSrc="https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg" title="Golden Temple" description="Visit the spiritual center of the Sikh faith." />
        </div>
      </Link>
    </div>
  );
};

export default Temples;
