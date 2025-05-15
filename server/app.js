// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const transactionRoutes = require('./routes/transactionRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection handling
let pool;
try {
  // Make sure password is properly handled
  const password = process.env.DB_PASSWORD || '';
  
  // Create connection pool with proper error handling
  pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: password.toString(), // Ensure password is a string
    port: parseInt(process.env.DB_PORT || '5432'),
    // Add connection timeout
    connectionTimeoutMillis: 5000,
  });

  // Log connection details (but not password)
  console.log('📊 Database config:', {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    port: process.env.DB_PORT || '5432',
  });
  
  // Test the connection
  pool.connect()
    .then(client => {
      console.log('✅ Connected to PostgreSQL database!');
      client.query('SELECT NOW()')
        .then(res => {
          console.log('✅ Time from DB:', res.rows[0]);
          client.release();
        })
        .catch(err => {
          console.error('❌ Query Error:', err);
          client.release();
        });
    })
    .catch(err => {
      console.error('❌ DB Connection Error:', err.stack);
      console.log('⚠️ Will continue with in-memory storage');
    });
} catch (err) {
  console.error('❌ Error creating DB pool:', err);
  console.log('⚠️ Will continue with in-memory storage');
}

// Routes
app.use('/api', transactionRoutes);

// 404 Handler
app.use((req, res) => {
  console.log(`❌ 404: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Export app for server.js
module.exports = app;