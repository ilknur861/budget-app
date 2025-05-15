// client/src/context/ExpenseContext.js

import React, { createContext, useState } from 'react';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now().toString(), // simple unique ID
      ...transaction
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return (
      <ExpenseContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
        {children}
      </ExpenseContext.Provider>
  );
};
