// controllers/transactionController.js

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// In-memory backup storage in case DB connection fails
let transactions = [
  // Sample transaction
  { id: 1, type: 'expense', category: 'Food', amount: 50, date: '2025-05-01' },
];

// Try to create DB pool with error handling
let pool;
try {
  const password = process.env.DB_PASSWORD || '';
  
  pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: password.toString(), // Ensure password is a string
    port: parseInt(process.env.DB_PORT || '5432'),
    connectionTimeoutMillis: 5000,
  });
} catch (err) {
  console.error('❌ Error creating DB pool in controller:', err);
}

exports.getTransactions = async (req, res) => {
  console.log('GET /api/transactions request received');
  
  try {
    // Try to use database if available
    if (pool) {
      try {
        const result = await pool.query('SELECT * FROM transactions ORDER BY date DESC');
        console.log('Transactions fetched from DB:', result.rows.length);
        return res.json(result.rows);
      } catch (dbErr) {
        console.error('❌ Database error, falling back to in-memory:', dbErr);
        // Continue to in-memory if DB fails
      }
    }
    
    // Fallback to in-memory
    console.log('Using in-memory transactions:', transactions.length);
    res.json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.addTransaction = async (req, res) => {
  console.log('POST /api/transactions request received', req.body);
  const { type, category, amount, date } = req.body;
  
  // Validate required fields
  if (!type || !amount || !date) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      details: { type, category, amount, date } 
    });
  }
  
  try {
    // Try database first if available
    if (pool) {
      try {
        const result = await pool.query(
          'INSERT INTO transactions (type, category, amount, date) VALUES ($1, $2, $3, $4) RETURNING *',
          [type, category, amount, date]
        );
        console.log('Transaction added to DB:', result.rows[0]);
        return res.status(201).json(result.rows[0]);
      } catch (dbErr) {
        console.error('❌ Database error, falling back to in-memory:', dbErr);
        // Continue to in-memory if DB fails
      }
    }
    
    // Fallback to in-memory storage
    const newTransaction = { 
      id: Date.now(), 
      type, 
      category, 
      amount: parseFloat(amount), 
      date 
    };
    transactions.push(newTransaction);
    console.log('Transaction added to memory:', newTransaction);
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error('Error adding transaction:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  console.log('DELETE /api/transactions/:id request received', req.params);
  const { id } = req.params;
  
  try {
    // Try database first if available
    if (pool) {
      try {
        const result = await pool.query('DELETE FROM transactions WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length > 0) {
          console.log('Transaction deleted from DB:', result.rows[0]);
          return res.json({ message: 'Transaction deleted successfully', transaction: result.rows[0] });
        }
        // If not found in DB, try in-memory
      } catch (dbErr) {
        console.error('❌ Database error, falling back to in-memory:', dbErr);
        // Continue to in-memory if DB fails
      }
    }
    
    // Fallback to in-memory
    const idNum = parseInt(id);
    const initialLength = transactions.length;
    transactions = transactions.filter(tx => tx.id !== idNum);
    
    if (transactions.length < initialLength) {
      console.log('Transaction deleted from memory:', idNum);
      return res.json({ message: 'Transaction deleted successfully' });
    }
    
    console.log('Transaction not found:', idNum);
    return res.status(404).json({ error: 'Transaction not found' });
  } catch (err) {
    console.error('Error deleting transaction:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  console.log('PUT /api/transactions/:id request received', req.params, req.body);
  const { id } = req.params;
  const { type, category, amount, date } = req.body;
  
  // Validate required fields
  if (!type || !amount || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    // Try database first if available
    if (pool) {
      try {
        const result = await pool.query(
          'UPDATE transactions SET type = $1, category = $2, amount = $3, date = $4 WHERE id = $5 RETURNING *',
          [type, category, amount, date, id]
        );
        
        if (result.rows.length > 0) {
          console.log('Transaction updated in DB:', result.rows[0]);
          return res.json(result.rows[0]);
        }
        // If not found in DB, try in-memory
      } catch (dbErr) {
        console.error('❌ Database error, falling back to in-memory:', dbErr);
        // Continue to in-memory if DB fails
      }
    }
    
    // Fallback to in-memory
    const idNum = parseInt(id);
    const index = transactions.findIndex(tx => tx.id === idNum);
    
    if (index !== -1) {
      transactions[index] = { 
        ...transactions[index], 
        type, 
        category, 
        amount: parseFloat(amount), 
        date 
      };
      console.log('Transaction updated in memory:', transactions[index]);
      return res.json(transactions[index]);
    }
    
    console.log('Transaction not found for update:', idNum);
    return res.status(404).json({ error: 'Transaction not found' });
  } catch (err) {
    console.error('Error updating transaction:', err);
    res.status(500).json({ error: err.message });
  }
};