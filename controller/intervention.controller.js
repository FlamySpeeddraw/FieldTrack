const Intervention = require("../model/intervention.model");

const getInterventions = async (req, res) => {
    let interventions = await Intervention.findAll();
    res.status(200).json(interventions);
};

const getInterventionById = async (req, res) => {
    let interventions = await Intervention.findByPk(req.params.id); 
    res.status(200).json(interventions);
}

const postIntervention = async (req, res) => {
    let newIntervention = await Intervention.create({
      date_intervention: req.body.date_intervention,
      id_utilisateur: req.body.id_utilisateur,
      status: req.body.status,
      description: req.body.description,
      commentaire: req.body.commentaire,
      photo: req.body.photo,
      adresse: req.body.adresse,
    });

    res.status(201).json({ message: "Intervention ajoutée", data: newIntervention });
};

const updateIntervention = async (req, res) => {
  const result = await Intervention.update(req.body, {
    where: { id_intervention: req.params.id },
  });
  res.status(200).json(result);
};

module.exports = { getInterventions, postIntervention, updateIntervention, getInterventionById };
