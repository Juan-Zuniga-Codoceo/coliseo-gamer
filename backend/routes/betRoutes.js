const express = require('express');
const { placeBet, getBetStatus } = require('../controllers/betController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

// Asegúrate de que `placeBet` esté correctamente importado
router.post('/place', authenticateToken, placeBet);

// Asegúrate de que `getBetStatus` esté correctamente importado
router.get('/:betId', authenticateToken, getBetStatus);

module.exports = router;
