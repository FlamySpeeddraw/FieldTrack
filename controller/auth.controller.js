const User = require('./../model/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        const { password: rawPassword, mail } = req.body;
        if (!rawPassword || !mail) {
            return res.status(400).json({ code: 'BAD_REQUEST', message: 'Mail et mot de passe requis' });
        }

        const hashedPassword = crypto.createHash('sha256').update(rawPassword).digest('hex');

        await User.createUser(mail, hashedPassword);
        res.status(201).json({ message: 'Utilisateur créé' });
    } catch (e) {
        if (e.errno) {
            return res.status(400).json({ code: 'CREATION_FAILED', message: 'L\'utilisateur n\'a pas pu être créé' });
        }
        res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Une erreur interne est survenue' });
    }
};

const login = async (req, res, next) => {
    try {
        const { password: rawPassword, mail } = req.body;
        if (!rawPassword || !mail) return res.status(400).json({ code: 'BAD_REQUEST', message: 'Mail et mot de passe requis' });

        const hashedPassword = crypto.createHash('sha256').update(rawPassword).digest('hex');
        const user = await User.findByCredentials(mail, hashedPassword);
        if (user.length < 1) res.status(401).json({ code: 'BAD_CREDENTIALS', message: 'Adresse mail ou mot de passe incorrect' });

        const { password, ...userSansMdp } = user;
        const accessToken = jwt.sign(userSansMdp, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1200s' });
        const refreshToken = jwt.sign(userSansMdp, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
        return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, message: 'Connexion réussie' });
    } catch (e) {
        res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Une erreur interne est survenue' });
    }
};

module.exports = { register, login };