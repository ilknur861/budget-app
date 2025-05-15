import React, { useEffect, useState } from 'react';
import { fetchTransactions, deleteTransaction } from '../api';
import { useNavigate } from 'react-router-dom';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load transactions:', err);
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmDelete) return;

    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((tx) => tx.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete transaction.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading transactions...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
      <div style={{ padding: '2rem', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Transaction List</h2>
        <table style={{ width: '90%', margin: '0 auto', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
          <thead>
          <tr>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Category</th>
            <th style={tableHeaderStyle}>Amount ($)</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
          </thead>
          <tbody>
          {transactions.map((tx) => (
              <tr key={tx.id}>
                <td style={tableCellStyle}>
                  {tx.date ? tx.date.split('T')[0] : 'N/A'}
                </td>
                <td style={tableCellStyle}>{tx.category}</td>
                <td style={tableCellStyle}>
                  {isNaN(Number(tx.amount)) ? '0.00' : Number(tx.amount).toFixed(2)}
                </td>
                <td style={tableCellStyle}>
                  <button style={editBtn} onClick={() => handleEdit(tx.id)}>Edit</button>
                  <button style={deleteBtn} onClick={() => handleDelete(tx.id)}>Delete</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

const tableHeaderStyle = {
  padding: '0.75rem',
  backgroundColor: '#3498db',
  color: '#fff',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
};

const tableCellStyle = {
  padding: '0.75rem',
  borderBottom: '1px solid #ddd',
};

const editBtn = {
  marginRight: '10px',
  padding: '5px 10px',
  backgroundColor: '#f39c12',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const deleteBtn = {
  padding: '5px 10px',
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default TransactionList;
