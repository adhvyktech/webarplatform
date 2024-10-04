import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/ar-experience">Create AR Experience</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;