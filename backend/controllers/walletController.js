const pool = require('../config/db');

// Agregar saldo a la billetera
const addFunds = async (req, res) => {
    const { amount } = req.body;

    try {
        const wallet = await pool.query(
            "UPDATE users SET balance = balance + $1 WHERE id = $2 RETURNING balance",
            [amount, req.user.id]
        );

        res.json({ balance: wallet.rows[0].balance });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Ver transacciones de la billetera
const getTransactions = async (req, res) => {
    try {
        const transactions = await pool.query(
            "SELECT * FROM transactions WHERE user_id = $1",
            [req.user.id]
        );

        res.json(transactions.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

module.exports = {
    addFunds,
    getTransactions
};
