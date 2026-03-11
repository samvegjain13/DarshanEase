import React from 'react';
import Unavbar from './Unavbar';
import Banner from '../Components/Banner';
import Services from '../Components/Services';
import Footer from '../Components/Footer';
import Temples from './Temples';

const Uhome = () => {
  return (
    <div style={{ background: '#0f0f23', minHeight: '100vh' }}>
      <Unavbar />
      <div>
        <Banner />
        <Temples />
        <Services />
        <Footer />
      </div>
    </div>
  );
};

export default Uhome;