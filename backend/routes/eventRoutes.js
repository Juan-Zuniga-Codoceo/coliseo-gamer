const express = require('express');
const { createEvent, getEvents, joinEvent } = require('../controllers/eventController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// Crear un nuevo evento
router.post('/create',  authenticateToken, createEvent);

// Obtener todos los eventos    
router.get('/', getEvents);

// Unirse a un evento
router.post('/join', authenticateToken, joinEvent);

module.exports = router;