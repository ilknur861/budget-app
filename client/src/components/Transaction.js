

// client/src/components/Transaction.js

import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

function Transaction({ transaction }) {
  const { deleteTransaction } = useContext(ExpenseContext);

  const sign = parseFloat(transaction.amount) < 0 ? '-' : '+';
  const formattedAmount = Math.abs(parseFloat(transaction.amount)).toFixed(2);

  return (
    <li className={parseFloat(transaction.amount) < 0 ? 'minus' : 'plus'}>
      <div>
        {transaction.category ? `${transaction.category}: ` : ''}
        {transaction.type}
      </div>
      <div className="transaction-buttons">
        <span>{sign}${formattedAmount}</span>
        <button 
          onClick={() => deleteTransaction(transaction.id)} 
          className="delete-btn"
        >
          x
        </button>
      </div>
    </li>
  );
}

export default Transaction;