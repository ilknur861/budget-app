import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTransactions, updateTransaction } from '../api';

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTransaction = async () => {
      try {
        const data = await fetchTransactions();
        const found = data.find((tx) => String(tx.id) === id);
        if (!found) {
          setError('Transaction not found');
        } else {
          setTransaction(found);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load transaction');
      }
    };

    loadTransaction();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: name === 'amount' ? parseFloat(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTransaction(transaction);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  if (error) return <p>{error}</p>;
  if (!transaction) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Transaction</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          name="title"
          value={transaction.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="category"
          value={transaction.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="number"
          name="amount"
          value={transaction.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
        <input
          type="date"
          name="date"
          value={transaction.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Transaction</button>
      </form>
    </div>
  );
};

export default EditTransaction;
