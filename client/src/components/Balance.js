
// client/src/components/Balance.js

import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

function Balance() {
  const { transactions } = useContext(ExpenseContext);

  const amounts = transactions.map(transaction => parseFloat(transaction.amount));
  const total = amounts.reduce((acc, item) => (acc + item), 0).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${total}</h1>
    </>
  );
}

export default Balance;