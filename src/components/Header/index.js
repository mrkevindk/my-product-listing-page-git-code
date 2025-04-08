import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaBook, FaUser, FaBars } from 'react-icons/fa';
import './index.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className="navbar-logo">
        <img
          src="https://i.postimg.cc/k5pX7Yw3/1-B0-D6-C59-E135-4-EF0-9168-6-A2-CBD53-AADF.png"
          alt="Logo Icon"
        />
      </div>

      <div className="navbar-links">
        <div className="logo-items">
          <h1 className="logo-heading">LOGO</h1>
          <div className="items-card">
            <p className="items-size"><Link to="/shop">Shop</Link></p>
            <p className="items-size"><Link to="/skills">Skills</Link></p>
            <p className="items-size"><Link to="/stories">Stories</Link></p>
            <p className="items-size"><Link to="/about">About</Link></p>
            <p className="items-size"><Link to="/contact">Contact Us</Link></p>
          </div>
        </div>
      </div>

      <div className="navbar-icons">
        <FaSearch />
        <FaHeart />
        <FaBook />
        <FaUser />
        <select className="language-select">
          <option value="en">ENG</option>
          <option value="hi">हिंदी</option>
        </select>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </div>
    </nav>
  );
}

export default Header;
