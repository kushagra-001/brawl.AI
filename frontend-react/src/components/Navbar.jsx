import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo font-montserrat">BR<span>AWL</span>.AI</div>
      
      <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
        <a href="#top-bots" onClick={() => setMobileMenuOpen(false)}>TOP BOTS ˅</a>
        <a href="#features" onClick={() => setMobileMenuOpen(false)}>HOW TO START</a>
        <a href="#faq" onClick={() => setMobileMenuOpen(false)}>F&Q</a>
        <a href="#" onClick={() => setMobileMenuOpen(false)}>MORE ˅</a>
      </div>

      <div className="nav-actions">

        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
