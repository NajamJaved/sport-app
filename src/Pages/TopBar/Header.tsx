import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (

    <header>
      <div className="header-child" id="home">
        <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i className="fa fa-bars"></i>
            <i className="fa fa-times"></i>
          </label>
          <div className="logo text-xl font-bold">
            <Link to="/"><h1>Logo</h1></Link>
          </div>
          <div className="edu-nav">
            <nav className="nav-menu">
              <ul>
                <li><Link to="/" className="hover:text-gray-400 transition">Home</Link></li>
                <li><Link to="/about" className="hover:text-gray-400 transition">About</Link></li>
                <li><Link to="/test" className="hover:text-gray-400 transition">Services</Link></li>
                <li><Link to="/contact" className="hover:text-gray-400 transition">Contact</Link></li>
              </ul>
            </nav>
          </div>
          <div className="social">
            <ul>
              <li><a href="#"><i className="fab fa-youtube"></i></a></li>
              <li><a href="#"><i className="fab fa-facebook"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            </ul>
          </div>
      </div>
    </header>
  );
};

export default Header;
