const Exemple = require('./../model/exemple.model');

const postExemple = async (req, res, next) => {
    try {
        const { test } = req.body;
        if (!test) return res.status(400).json({ code: 'BAD_REQUEST', message: 'Test requis' });

        const result = await Exemple.postExemple(test);
        if (!result) return res.status(400).json({ code: 'CREATION_FAILED', message: 'L\'exemple n\'a pas pu être enregistrée' });
        res.status(201).json({ message: 'Exemple enregistrée' });
    } catch (e) {
        console.log(e)
        res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Une erreur interne est survenue' });
    }
};

const getExemple = async (req, res, next) => {
    try {
        const result = await Exemple.getAllExemple();
        if (!result) return res.status(400).json({ code: 'NOT_FOUND', message: 'Aucun exemple trouvé' });
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Une erreur interne est survenue' });
    }
};

module.exports = { getExemple, postExemple }; 