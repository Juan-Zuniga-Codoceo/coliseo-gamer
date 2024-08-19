const pool = require('../config/db');

// Crear un nuevo evento
const createEvent = async (req, res) => {
    const { game, date, entryFee } = req.body;

    try {
        const newEvent = await pool.query(
            "INSERT INTO events (game, date, entry_fee, created_by) VALUES ($1, $2, $3, $4) RETURNING *",
            [game, date, entryFee, req.user.id]
        );

        res.status(201).json(newEvent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Obtener todos los eventos disponibles
const getEvents = async (req, res) => {
    try {
        const events = await pool.query("SELECT * FROM events");
        res.json(events.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Unirse a un evento
const joinEvent = async (req, res) => {
    const { eventId } = req.body;

    try {
        const event = await pool.query(
            "UPDATE events SET participants = array_append(participants, $1) WHERE id = $2 RETURNING *",
            [req.user.id, eventId]
        );

        if (event.rows.length === 0) {
            return res.status(404).json({ msg: "Evento no encontrado" });
        }

        res.json(event.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

module.exports = {
    createEvent,
    getEvents,
    joinEvent
};
