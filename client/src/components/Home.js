import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { fetchTransactions } from '../api'; // Make sure api.js exists and is correctly linked
import '../styles.css';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    fetchTransactions().then(data => {
      setTransactions(data);
      const inc = data
        .filter(item => item.type === 'income')
        .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
      const exp = data
        .filter(item => item.type === 'expense')
        .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

      setIncome(inc);
      setExpenses(exp);
    });
  }, []);

  const balance = income - expenses;

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ['#2ecc71', '#e74c3c'],
        hoverBackgroundColor: ['#27ae60', '#c0392b'],
      },
    ],
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
      <h1 style={{ color: '#2c3e50' }}>💰 Welcome to Budget Manager</h1>
      <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
        Manage your income and expenses with ease. Start tracking today!
      </p>

      <motion.div
        className="stats-container"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="card"
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            padding: '1.5rem',
            textAlign: 'center',
            flex: '1',
            margin: '0 1rem',
          }}
          whileHover={{ scale: 1.05 }}
        >
          <h3>Total Income</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${income}</p>
        </motion.div>
        <motion.div
          className="card"
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            padding: '1.5rem',
            textAlign: 'center',
            flex: '1',
            margin: '0 1rem',
          }}
          whileHover={{ scale: 1.05 }}
        >
          <h3>Total Expenses</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${expenses}</p>
        </motion.div>
        <motion.div
          className="card"
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            padding: '1.5rem',
            textAlign: 'center',
            flex: '1',
            margin: '0 1rem',
          }}
          whileHover={{ scale: 1.05 }}
        >
          <h3>Balance</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${balance}</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="chart-container"
        style={{ marginBottom: '2rem', width: '300px', margin: '0 auto' }} // Smaller chart
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3>Budget Overview</h3>
        <Doughnut data={chartData} />
      </motion.div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
          <Link
            to="/add"
            style={{
              textDecoration: 'none',
              backgroundColor: '#3498db',
              color: '#fff',
              padding: '0.8rem 1.6rem',
              borderRadius: '5px',
              fontSize: '1.1rem',
            }}
          >
            ➕ Add Transaction
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
          <Link
            to="/list"
            style={{
              textDecoration: 'none',
              backgroundColor: '#2ecc71',
              color: '#fff',
              padding: '0.8rem 1.6rem',
              borderRadius: '5px',
              fontSize: '1.1rem',
            }}
          >
            📄 View Transactions
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
