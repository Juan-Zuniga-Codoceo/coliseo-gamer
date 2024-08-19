const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pool = require('./config/db');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/test-simple', (req, res) => {
    res.send('Ruta de prueba simple funcionando');
});


// Ruta de prueba de conexión a la base de datos
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en la conexión a la base de datos');
    }
});

// Otras rutas...
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/bets', require('./routes/betRoutes'));
app.use('/api/wallet', require('./routes/walletRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// Conectar a la base de datos y arrancar el servidor
const PORT = process.env.PORT || 4000;
pool.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch(err => console.error('Error al conectar a la base de datos', err));
