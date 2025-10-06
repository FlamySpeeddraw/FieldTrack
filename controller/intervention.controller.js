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

const postIntervention = async (req, res) => {
  try {
    const { date_intervention, id_utilisateur, status, description, commentaire, photo, adresse } = req.body;

    await Intervention.postIntervention(
      date_intervention,
      id_utilisateur,
      status,
      description,
      commentaire,
      photo,
      adresse
    );

    res.status(201).json({ message: "Intervention ajoutée avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'intervention:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = { getInterventions, postIntervention };
