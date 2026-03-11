import React, { useState, useRef } from 'react';
import './navbar.css';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  return (
    <div className='navabar'>
      <div className='class1'>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <Link to='home' smooth={true} duration={500} onClick={scrollToTop} offset={-80}>
            <span style={{
              fontSize: '1.6rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #f97316, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '1px'
            }}>
              🕉 DarshanEase
            </span>
          </Link>
        </div>
      </div>
      <div>
        <nav className='nav1'>
          <p>
            <Link to='home' smooth={true} duration={500} onClick={scrollToTop} offset={-80}>
              Home
            </Link>
          </p>
          <p>
            <Link to='temples' smooth={true} duration={500} offset={-120}>
              Temples
            </Link>
          </p>
          <p>
            <Link to='about' smooth={true} duration={500} offset={-140}>
              About
            </Link>
          </p>
          <p>
            <Link to='services' smooth={true} duration={500} offset={-140}>
              Services
            </Link>
          </p>
          <p>
            <Link to='contact' smooth={true} duration={500} offset={-100}>
              Contact
            </Link>
          </p>

          <div
            className='dropdown'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className='dropbtn' onClick={() => setDropdownOpen(!isDropdownOpen)}>
              ✦ Login
            </button>
            {isDropdownOpen && (
              <div className='dropdown-content'>
                <RouterLink to='/ulogin'>👤 User</RouterLink>
                <RouterLink to='/ologin'>🏛 Organizer</RouterLink>
                <RouterLink to='/alogin'>⚙ Admin</RouterLink>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;