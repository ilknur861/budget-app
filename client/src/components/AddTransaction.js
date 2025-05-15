import React, { useState, useEffect } from 'react';
import { addTransaction, fetchTransactions } from '../api';

const AddTransaction = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await fetchTransactions();
                setTransactions(data);
            } catch (err) {
                console.error('Failed to load transactions:', err);
            }
        };

        loadTransactions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTransaction = {
            type: type === 'income' ? 'Income' : 'Expense', // Capitalized to match API
            category,
            amount: parseFloat(amount), // Positive number always
            date: new Date().toISOString().slice(0, 10) // YYYY-MM-DD format
        };

        try {
            await addTransaction(newTransaction);
            setMessage('Transaction added successfully!');
            setTitle('');
            setAmount('');
            setCategory('');
            setType('');

            // Refresh transactions
            const updatedTransactions = await fetchTransactions();
            setTransactions(updatedTransactions);
        } catch (error) {
            setMessage('Failed to add transaction.');
            console.error(error);
        }
    };

    return (
        <div style={{
            padding: '2rem',
            backgroundColor: '#f9f9f9',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{
                color: '#2c3e50',
                marginBottom: '1.5rem',
                fontSize: '1.8rem'
            }}>
                Add New Transaction
            </h2>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    maxWidth: '400px',
                    margin: '0 auto',
                    padding: '1.5rem',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
            >
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    style={{
                        padding: '0.8rem',
                        fontSize: '1rem',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        transition: 'border 0.3s ease',
                        backgroundColor: 'white',
                        cursor: 'pointer'
                    }}
                >
                    <option value="">-- Select Type --</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    style={{
                        padding: '0.8rem',
                        fontSize: '1rem',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        transition: 'border 0.3s ease',
                    }}
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    style={{
                        padding: '0.8rem',
                        fontSize: '1rem',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        transition: 'border 0.3s ease',
                    }}
                />

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#3498db',
                        color: '#fff',
                        padding: '0.8rem 1.6rem',
                        borderRadius: '5px',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: 'none',
                        marginTop: '1rem'
                    }}
                >
                    Add Transaction
                </button>

                {message && (
                    <p style={{
                        color: message.includes('success') ? '#27ae60' : '#e74c3c',
                        fontWeight: '500',
                        marginTop: '0.5rem'
                    }}>
                        {message}
                    </p>
                )}
            </form>

            <div style={{ marginTop: '2.5rem' }}>
                <h3 style={{
                    color: '#2c3e50',
                    marginBottom: '1rem',
                    fontSize: '1.4rem'
                }}>
                    Recent Transactions
                </h3>

                {transactions.length === 0 ? (
                    <p style={{ color: '#7f8c8d' }}>No transactions yet</p>
                ) : (
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '1rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        {transactions.map((t) => (
                            <li
                                key={t.id || t._id}
                                style={{
                                    margin: '0.5rem 0',
                                    padding: '0.8rem',
                                    borderBottom: '1px solid #eee',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <span style={{
                                        fontWeight: '600',
                                        color: t.type === 'Expense' ? '#e74c3c' : '#27ae60'
                                    }}>
                                        {t.type}
                                    </span>
                                    <span style={{
                                        fontSize: '0.9rem',
                                        color: '#7f8c8d',
                                        marginLeft: '0.5rem'
                                    }}>
                                        {t.category}
                                    </span>
                                </div>
                                <div style={{
                                    fontWeight: '600',
                                    color: t.type === 'Expense' ? '#e74c3c' : '#27ae60'
                                }}>
                                    {t.type === 'Expense' ? '-' : '+'}{Math.abs(t.amount).toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AddTransaction;