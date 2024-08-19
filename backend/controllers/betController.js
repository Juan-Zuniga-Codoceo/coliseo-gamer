const pool = require('../config/db');

// Realizar una apuesta
const placeBet = async (req, res) => {
    const { eventId, amount } = req.body;

    try {
        const bet = await pool.query(
            "INSERT INTO bets (event_id, user_id, amount) VALUES ($1, $2, $3) RETURNING *",
            [eventId, req.user.id, amount]
        );

        res.status(201).json(bet.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Ver el estado de una apuesta
const getBetStatus = async (req, res) => {
    const { betId } = req.params;

    try {
        const bet = await pool.query("SELECT * FROM bets WHERE id = $1", [betId]);

        if (bet.rows.length === 0) {
            return res.status(404).json({ msg: "Apuesta no encontrada" });
        }

        res.json(bet.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

module.exports = {
    placeBet,
    getBetStatus
};
