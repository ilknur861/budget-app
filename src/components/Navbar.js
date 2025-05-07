import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>💰 Budget Manager</h2>
      <div style={styles.linksContainer}>
        <Link to="/" style={styles.link} onMouseEnter={(e) => handleMouseEnter(e)} onMouseLeave={(e) => handleMouseLeave(e)}>Home</Link>
        <Link to="/add" style={styles.link} onMouseEnter={(e) => handleMouseEnter(e)} onMouseLeave={(e) => handleMouseLeave(e)}>Add Transaction</Link>
        <Link to="/list" style={styles.link} onMouseEnter={(e) => handleMouseEnter(e)} onMouseLeave={(e) => handleMouseLeave(e)}>Transaction List</Link>
      </div>
    </nav>
  );
};

const handleMouseEnter = (e) => {
  e.target.style.color = '#FFEB3B';  // Hover effect to yellow color
};

const handleMouseLeave = (e) => {
  e.target.style.color = 'white';  // Revert back to white on mouse leave
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.2rem 3rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  linksContainer: {
    display: 'flex',
  },
  link: {
    margin: '0 1.5rem',
    textDecoration: 'none',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
};

export default Navbar;
