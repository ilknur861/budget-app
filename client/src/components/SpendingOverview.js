import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../api';

const SpendingOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [categorySpending, setCategorySpending] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        console.log('Fetched transactions:', data); // Debug log
        setTransactions(data);
        setLoading(false);
        // Other logic...
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    };
  
    loadTransactions();
  }, []);
  

  if (loading) return <p style={{ textAlign: 'center' }}>Loading overview...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fefefe', textAlign: 'center' }}>
      <h2 style={{ color: '#2c3e50' }}>Spending Overview</h2>
      <p style={{ fontSize: '1.2rem' }}><strong>Total Spending:</strong> ${totalSpending.toFixed(2)}</p>
      <div style={{ marginTop: '2rem' }}>
        <h3>Spending by Category</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {Object.entries(categorySpending).map(([category, amount]) => (
            <li key={category} style={{ margin: '0.5rem 0' }}>
              <strong>{category}:</strong> ${amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpendingOverview;
