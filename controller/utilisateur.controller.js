const utilisateurModel = require("../model/utilisateur.model");

// CREATE
exports.createUtilisateur = async (req, res) => {
  try {
    const { mail, mdp, role } = req.body;

    if (!mail || !mdp || !role) {
      return res.status(400).json({
        success: false,
        message: "Les champs 'mail', 'mdp' et 'role' sont obligatoires."
      });
    }

    const result = await utilisateurModel.create(mail, mdp, role);
    return res.status(201).json({
      success: true,
      message: `Utilisateur avec rôle '${role}' créé avec succès.`,
      data: result
    });
  } catch (error) {
    console.error("Erreur création utilisateur :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la création de l'utilisateur.",
      error: error.message
    });
  }
};

// READ ALL
exports.getAllUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await utilisateurModel.getAll();
    return res.status(200).json({
      success: true,
      message: "Liste des utilisateurs récupérée avec succès.",
      data: utilisateurs
    });
  } catch (error) {
    console.error("Erreur lecture utilisateurs :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération des utilisateurs.",
      error: error.message
    });
  }
};

// READ ONE
exports.getUtilisateurById = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "L'ID de l'utilisateur doit être un nombre valide."
      });
    }

    const utilisateur = await utilisateurModel.getById(id);
    if (!utilisateur) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Utilisateur trouvé.",
      data: utilisateur
    });
  } catch (error) {
    console.error("Erreur lecture utilisateur :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération de l'utilisateur.",
      error: error.message
    });
  }
};

// UPDATE
exports.updateUtilisateur = async (req, res) => {
  try {
    const id = req.params.id;
    const { mail, mdp, role } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "L'ID de l'utilisateur doit être un nombre valide."
      });
    }

    if (!mail || !mdp) {
      return res.status(400).json({
        success: false,
        message: "Les champs 'mail' et 'mdp' sont obligatoires pour la mise à jour."
      });
    }

    const updated = await utilisateurModel.update(id, mail, mdp, role);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Utilisateur mis à jour avec succès."
    });
  } catch (error) {
    console.error("Erreur mise à jour utilisateur :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la mise à jour de l'utilisateur.",
      error: error.message
    });
  }
};

// DELETE
exports.deleteUtilisateur = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "L'ID de l'utilisateur doit être un nombre valide."
      });
    }

    const deleted = await utilisateurModel.remove(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Utilisateur supprimé avec succès."
    });
  } catch (error) {
    console.error("Erreur suppression utilisateur :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la suppression de l'utilisateur.",
      error: error.message
    });
  }
};
