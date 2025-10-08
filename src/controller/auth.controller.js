const { generateRefreshToken, hashToken } = require('../utils/token.util');
const db = require('./../config/connexion');
const User = db.User;
const Refresh = db.Refresh;
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try {
        const { mdp: rawPassword, mail } = req.body;
        if (!rawPassword || !mail) {
            return res.status(400).json({ code: 'BAD_REQUEST', message: 'Mail et mot de passe requis' });
        }

        const user = await User.findOne({ where: { mail } });
        if (!user) {
            return res.status(403).json({ message: 'mail ou mot de passe incorrect' });
        }

        if (!bcryptjs.compareSync(rawPassword, user.mdp)) {
            return res.status(403).json({ message: 'mail ou mot de passe incorrect' });
        }

        const newRefreshToken = generateRefreshToken();
        const tokenHash = hashToken(newRefreshToken);

        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
        const refreshToken = await Refresh.create({
            userId: user.id,
            tokenHash: tokenHash,
            parentHash: null,
            deviceId: req.headers["x-device-id"],
            userAgent: req.get("User-Agent"),
            ip: req.ip,
            revoked: false,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });

        res.status(200).json({ token, newRefreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Erreur interne' });
    }
}

const register = async (req, res, next) => {
    try {
        const { mdp: rawPassword, mail } = req.body;
        if (!rawPassword || !mail) {
            return res.status(400).json({ code: 'BAD_REQUEST', message: 'Mail et mot de passe requis' });
        }

        const hashedPassword = bcryptjs.hashSync(rawPassword, 10);
        const newUser = await User.create({
            mail,
            mdp: hashedPassword
        });

        res.status(201).json({ message: 'Utilisateur créé' });
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Erreur interne' });
    }
}

const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ error: "Refresh token invalide" })
        }

        const incomingHash = hashToken(refreshToken);
        const tokenBase = await Refresh.findOne({ where: { tokenHash: incomingHash } });
        if (!tokenBase || tokenBase.revoked || tokenBase.expiresAt < new Date()) {
            return res.status(401).json({ error: "Refresh token invalide" })
        }


        const user = await User.findOne({ where: { id: tokenBase.userId } });
        await tokenBase.update({ revoked: true });

        const newRefreshToken = generateRefreshToken();
        const tokenHash = hashToken(newRefreshToken);
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES });

        const refresh = await Refresh.create({
            userId: user.id,
            tokenHash: tokenHash,
            parentHash: incomingHash,
            deviceId: req.headers["x-device-id"],
            userAgent: req.get("User-Agent"),
            ip: req.ip,
            revoked: false,
            expiresAt: new Date(Date.now() + process.env.REFRESH_EXPIRES_DAY * 24 * 60 * 60 * 1000)
        });

        res.status(200).json({ token, newRefreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Erreur interne' });
    }
}

module.exports = { login, register, refresh };