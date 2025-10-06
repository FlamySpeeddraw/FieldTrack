const User = require('./../model/user.model');
const crypto = require('crypto');

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

module.exports = { register };