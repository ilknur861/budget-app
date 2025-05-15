// api.js (Frontend)
const API_BASE = process.env.REACT_APP_API_URL;

export const getTransactions = async () => {
  const res = await fetch(`${API_BASE}/api/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return await res.json();
};


export const fetchTransactions = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/transactions', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Server response:', errorData);
      throw new Error(`Failed to fetch transactions: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const addTransaction = async (transaction) => {
  console.log('Attempting to add transaction:', transaction);
  try {
    const res = await fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    console.log('POST /api/transactions request sent');
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Server response:', errorData);
      throw new Error(`Failed to add transaction: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
      method: 'DELETE',
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Server response:', errorData);
      throw new Error(`Failed to delete transaction: ${res.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (transaction) => {
  try {
    const res = await fetch(`http://localhost:5000/api/transactions/${transaction.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Server response:', errorData);
      throw new Error(`Failed to update transaction: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};
