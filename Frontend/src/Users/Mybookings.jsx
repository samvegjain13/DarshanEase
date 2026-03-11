import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import API_BASE, { getImageUrl } from '../api';
import { useNavigate } from 'react-router-dom';
import Unavbar from './Unavbar';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import QRCode from "react-qr-code";
import Footer from '../Components/Footer';

function Mybookings() {
  const [items, setItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const pdref = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.get(`${API_BASE}/user/getbookings/${user.id}`)
        .then((response) => setItems(response.data))
        .catch((error) => console.error('Error fetching bookings: ', error));
    }
  }, []);

  const downloadpdf = async (card) => {
    if (!card) return;
    setSelectedCard(card);
    setTimeout(async () => {
      const input = pdref.current;
      if (!input) return;
      const canvas = await html2canvas(input, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = pdfWidth / imgWidth;
      pdf.addImage(imgData, 'PNG', 0, 30, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`booking_${card._id.slice(0, 10)}.pdf`);
    }, 200);
  };

  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Unavbar />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '32px' }}>My Bookings</h2>

        {items.length === 0 && <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1rem' }}>No bookings yet. Visit temples to book darshan!</p>}

        {items.map((item) => (
          <div key={item._id} ref={selectedCard?._id === item._id ? pdref : null} style={{
            background: 'rgba(26, 26, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.12)', borderRadius: '16px',
            padding: '24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap',
          }}>
            <img src={`${getImageUrl(item.templeImage)}`} alt="Temple" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
            <div style={{ background: 'white', padding: '4px', borderRadius: '8px' }}>
              <QRCode size={64} value={item._id.slice(0, 10)} viewBox={`0 0 256 256`} />
            </div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
              <div><p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Booking ID</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.85rem', margin: 0 }}>{item._id.slice(0, 10)}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Temple</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.85rem', margin: 0 }}>{item.templeName}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Darshan</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.85rem', margin: 0 }}>{item.darshanName}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Date</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.85rem', margin: 0 }}>{item.BookingDate}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Timing</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.85rem', margin: 0 }}>{item.open}-{item.close}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Tickets</p><p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '0.85rem', margin: 0 }}>{item.quantity}</p></div>
              <div><p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Amount</p><p style={{ color: '#f97316', fontWeight: '700', fontSize: '0.95rem', margin: 0 }}>₹{item.totalamount}</p></div>
            </div>
            <button onClick={() => downloadpdf(item)} style={{ padding: '10px 20px', background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>
              ⬇ Download
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Mybookings;
