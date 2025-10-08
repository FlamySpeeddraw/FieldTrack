const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        req.payload = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (e) {
        if (e.name === "TokenExpiredError") return res.status(401).json({ code: "TOKEN_EXPIRED", message: "Le token a expiré" });

        return res.status(401).json({ code: "INVALID_TOKEN", message: "Le token est manquant ou mauvais" });
    }
}

module.exports = { verifyToken };