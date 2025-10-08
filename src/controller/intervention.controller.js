const db = require("../config/connection");
const Intervention = db.Intervention;
const User = db.User;


// Avoir toute les interventions, sans critère spécifique 
const getInterventions = async (req, res, next) => {
  try {
    const interventions = await Intervention.findAll();
    res.status(200).json({ data: interventions });
  } catch (e) { next(e); }
};

// Avoir une seule intervention, par Id 
const getInterventionById = async (req, res, next) => {
  try {
    const intervention = await Intervention.findByPk(req.params.id);
    if (!intervention) return res.status(404).json({ message: "Intervention introuvable" });
    res.status(200).json({ data: intervention });
    
  } catch (e) { next(e); }
};

// Créer une intervention, vérifie avant si l'utilisateur 
const postIntervention = async (req, res, next) => {
  try {
    const utilisateur = await User.findByPk(req.body.id_utilisateur);

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non existant" });
    }

    const newIntervention = await Intervention.create({
      date_intervention: req.body.date_intervention,
      id_utilisateur: req.body.id_utilisateur,
      status: req.body.status,
      description: req.body.description,
      commentaire: req.body.commentaire,
      photo: req.body.photo,
      adresse: req.body.adresse,
    });
    res.status(201).json({ message: "Intervention ajoutée", data: newIntervention });
  } catch (e) { next(e); }
};

// Mettre à jour une intervention en fonction d'un ID (attention, seuls le status, le commentaire et la photo peuvent être modifiés)
const updateIntervention = async (req, res, next) => {
  try {
    const allowedFields = ['status', 'commentaire', 'photo'];
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });
    
    const [updated] = await Intervention.update(updateData, {
      where: { id_intervention: req.params.id }
    });
    
    res.status(200).json({ updated });
  } catch (e) { 
    next(e); 
  }
};

// Supprimer une intervention en fonction de l'id (non, on ne va pas supprimer toute les interventions d'un coup parce qu'on est pas des bourrins 👍)
const deleteIntervention = async (req, res, next) => {
  try {
    const deleted = await Intervention.destroy({
      where: { id_intervention: req.params.id }
    });

    if (deleted) {
      res.status(200).json({ message: "Intervention supprimée" });
    } else {
      res.status(404).json({ message: "Intervention non trouvée" });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { getInterventions, getInterventionById, postIntervention, updateIntervention, deleteIntervention};
