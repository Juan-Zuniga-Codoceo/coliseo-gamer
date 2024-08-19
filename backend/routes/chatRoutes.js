const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');

// Ruta para enviar un mensaje
router.post('/send', authenticateToken, sendMessage);

// Ruta para obtener mensajes de un chat
router.get('/:recipientId', authenticateToken, getMessages);

module.exports = router;
