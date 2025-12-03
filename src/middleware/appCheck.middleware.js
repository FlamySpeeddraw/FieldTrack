const jwt = require('jsonwebtoken');

const appCheck = (app) => {
    return (req, res, next) => {
        const { appType } = req.payload;

        if (app !== appType) {
            return res.status(401).json({ code: "UNAUTHORIZED", message: "Mauvaise application" });
        }

        next();
    }
}

module.exports = { appCheck };