const express = require('express');
const { addFunds, getTransactions } = require('../controllers/walletController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

// Ruta para agregar fondos a la billetera
router.post('/add-funds', authenticateToken, addFunds);

// Ruta para ver las transacciones de la billetera
router.get('/transactions', authenticateToken, getTransactions);

module.exports = router;
