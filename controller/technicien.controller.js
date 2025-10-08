const technicienModel = require("../model/technicien.model");

// 🔹 CREATE
exports.createTechnicien = async (req, res) => {
  try {
    const { mail, mdp } = req.body;

    if (!mail || !mdp) {
      return res.status(400).json({
        success: false,
        message: "Les champs 'mail' et 'mdp' sont obligatoires."
      });
    }

    const result = await technicienModel.create(mail, mdp);
    return res.status(201).json({
      success: true,
      message: "Technicien créé avec succès.",
      data: result
    });
  } catch (error) {
    console.error("Erreur création technicien :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la création du technicien.",
      error: error.message
    });
  }
};

// 🔹 READ ALL
exports.getAllTechniciens = async (req, res) => {
  try {
    const techniciens = await technicienModel.getAll();
    return res.status(200).json({
      success: true,
      message: "Liste des techniciens récupérée avec succès.",
      data: techniciens
    });
  } catch (error) {
    console.error("Erreur lecture techniciens :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération des techniciens.",
      error: error.message
    });
  }
};

// 🔹 READ ONE
exports.getTechnicienById = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "L'ID du technicien doit être un nombre valide."
      });
    }

    const technicien = await technicienModel.getById(id);
    if (!technicien) {
      return res.status(404).json({
        success: false,
        message: "Technicien non trouvé."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Technicien trouvé.",
      data: technicien
    });
  } catch (error) {
    console.error("Erreur lecture technicien :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération du technicien.",
      error: error.message
    });
  }
};

// 🔹 UPDATE
exports.updateTechnicien = async (req, res) => {
  try {
    const id = req.params.id;
    const { mail, mdp } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "L'ID du technicien doit être un nombre valide."
      });
    }

    if (!mail || !mdp) {
      return res.status(400).json({
        success: false,
        message: "Les champs 'mail' et 'mdp' sont obligatoires pour la mise à jour."
      });
    }

    const updated = await technicienModel.update(id, mail, mdp);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Technicien non trouvé."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Technicien mis à jour avec succès."
    });
  } catch (error) {
    console.error("Erreur mise à jour technicien :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la mise à jour du technicien.",
      error: error.message
    });
  }
};

// 🔹 DELETE
exports.deleteTechnicien = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "L'ID du technicien doit être un nombre valide."
      });
    }

    const deleted = await technicienModel.remove(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Technicien non trouvé."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Technicien supprimé avec succès."
    });
  } catch (error) {
    console.error("Erreur suppression technicien :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la suppression du technicien.",
      error: error.message
    });
  }
};
