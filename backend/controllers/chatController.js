const pool = require('../config/db');

// Enviar un mensaje
const sendMessage = async (req, res) => {
    const { recipientId, message } = req.body;

    try {
        const newMessage = await pool.query(
            "INSERT INTO messages (sender_id, recipient_id, message) VALUES ($1, $2, $3) RETURNING *",
            [req.user.id, recipientId, message]
        );

        res.status(201).json(newMessage.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Obtener mensajes de un chat
const getMessages = async (req, res) => {
    const { recipientId } = req.params;

    try {
        const messages = await pool.query(
            "SELECT * FROM messages WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)",
            [req.user.id, recipientId]
        );

        res.json(messages.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

module.exports = {
    sendMessage,
    getMessages
};
