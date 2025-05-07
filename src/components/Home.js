import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>💰 Welcome to Budget Manager</h1>
      <p>Track your income and expenses easily.</p>
      <Link to="/add">➕ Add Transaction</Link> | <Link to="/list">📄 View Transactions</Link>
    </div>
  );
};

export default Home;
