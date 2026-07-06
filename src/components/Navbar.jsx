import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) return null;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          BlogApp
        </NavLink>

        <div className={`nav-toggle ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => "nav-links" + (isActive ? " active-link" : "")}
              onClick={toggleMenu}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/blogs" 
              className={({ isActive }) => "nav-links" + (isActive ? " active-link" : "")}
              onClick={toggleMenu}
            >
              Blogs
            </NavLink>
          </li>
          {user && (
            <>
              <li className="nav-item">
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => "nav-links" + (isActive ? " active-link" : "")}
                  onClick={toggleMenu}
                >
                  Dashboard
                </NavLink>
              </li>
              {user.role === 'admin' && (
                <li className="nav-item">
                  <NavLink 
                    to="/users" 
                    className={({ isActive }) => "nav-links" + (isActive ? " active-link" : "")}
                    onClick={toggleMenu}
                  >
                    Users
                  </NavLink>
                </li>
              )}
            </>
          )}
          {user ? (
            <li className="nav-item">
              <button onClick={() => { logout(); toggleMenu(); }} className="nav-links logout-btn">
                Logout
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink 
                to="/login" 
                className={({ isActive }) => "nav-links nav-btn" + (isActive ? " active-link" : "")}
                onClick={toggleMenu}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
