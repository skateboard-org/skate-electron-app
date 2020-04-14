import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

export default function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to={routes.HOME}>
          Home
        </Link>
      </div>

      <Link className="navbar-item" to={routes.COUNTER}>
        Counter
      </Link>
    </nav>
  );
}
