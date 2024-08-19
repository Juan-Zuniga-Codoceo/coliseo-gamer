const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "Acceso denegado, no se proporcionó token" });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardar la información del usuario en req.user
        next(); // Continuar con la siguiente función
    } catch (err) {
        return res.status(403).json({ msg: "Token no válido" });
    }
};

module.exports = authenticateToken;
