const Intervention = require("../model/intervention.model");

const getInterventions = async (req, res, next) => {
    try {
        const result = await Intervention.getInterventions();
        if (!result || result.length === 0)
            return res.status(404).json({ code: "NOT_FOUND", message: "Aucune intervention trouvée" });

        res.status(200).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ code: "INTERNAL_ERROR", message: "Une erreur interne est survenue" });
    }
};

module.exports = { getInterventions };
