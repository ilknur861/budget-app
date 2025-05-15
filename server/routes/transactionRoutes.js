// routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/transactions', transactionController.getTransactions);
router.post('/transactions', transactionController.addTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);
router.put('/transactions/:id', transactionController.updateTransaction);

module.exports = router;