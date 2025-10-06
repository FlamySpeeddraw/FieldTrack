const jwt = require('jsonwebtoken');

const verifyTokenAccess = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        req.payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError"){
            return res.status(401).json({ code: "TOKEN_EXPIRED", message: "Le token a expiré" });
        }

        return res.status(401).json({ code: "INVALID_TOKEN", message: "Le token est manquant ou mauvais" });
    }
}

const verifyTokenRefresh = (req, res, next) => {
    const token = req.body.refresh;

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const { iat, exp, ...user } = decoded;
        req.user = user;
        return next();
    } catch (e) {
        if (e.name === "TokenExpiredError") return res.status(401).json({ code: "TOKEN_EXPIRED", message: "Le token a expiré" });

        return res.status(401).json({ code: "INVALID_TOKEN", message: "Le token est manquant ou mauvais" });
    }
}

module.exports = { verifyTokenAccess, verifyTokenRefresh };