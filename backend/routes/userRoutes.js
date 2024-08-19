const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', registerUser);

// Ruta para login de usuario
router.post('/login', loginUser);

// Ruta para obtener el perfil del usuario (requiere autenticación)
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;
