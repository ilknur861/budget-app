import React, { useState, useEffect } from 'react';

const AddTransaction = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [transactions, setTransactions] = useState([]);

  // Load existing transactions from local storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('transactions'));
    if (stored) {
      setTransactions(stored);
    }
  }, []);

  // Save transactions to local storage whenever updated
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString(),
    };

    setTransactions([...transactions, newTransaction]);

    // Clear form
    setTitle('');
    setAmount('');
    setCategory('');
  };

  return (
    <div>
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        /><br />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
