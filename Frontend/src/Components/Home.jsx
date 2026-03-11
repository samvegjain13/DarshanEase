import React from 'react';
import './navbar.css';
import Banner from './Banner';
import Temples from './Temples';
import About from './About';
import Footer from './Footer';
import NavBar from './NavBar';
import Services from './Services';

const Home = () => {
  return (
    <div className='class' id='home'>
      <NavBar />
      <div className='content'>
        <Banner />
        <Temples />
        <About />
        <Services />
        <Footer />
      </div>
    </div>
  );
};

export default Home;