const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insertar el usuario en la base de datos
        const newUser = await pool.query(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
            [username, hashedPassword, email]
        );

        // Crear el token JWT
        const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Login de usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ msg: "Credenciales inválidas" });
        }

        // Comparar contraseñas
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(400).json({ msg: "Credenciales inválidas" });
        }

        // Crear el token JWT
        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Obtener el perfil del usuario
const getUserProfile = async (req, res) => {
    try {
        const user = await pool.query("SELECT id, username, email FROM users WHERE id = $1", [req.user.id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
