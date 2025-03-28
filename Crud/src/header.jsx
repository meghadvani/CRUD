import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderStyles.css'; // We'll create this CSS file

const Header = () => {
  return (
    <header className="header_container">
      <div className="header_content">
        <h1 className="header_title">Complain Register Form</h1>
        <nav className="header_nav">
          <Link to="/" className="nav_link">Add Data</Link>
          {/* <span className="nav_separator">||</span> */}
          <Link to="/display" className="nav_link">View Data</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;