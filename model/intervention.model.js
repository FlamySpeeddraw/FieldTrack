const db = require("../database");

const getInterventions = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM intervention");
    return rows;
  } catch (error) {
    console.error("Erreur lors de la récupération des interventions:", error);
    throw error;
  }
};

const postIntervention = async (date_intervention, id_utilisateur, status, description, commentaire, photo, adresse) => {
  try {
    const [result] = await db.query(
      `INSERT INTO intervention (date_intervention, id_utilisateur, status, description, commentaire, photo, adresse)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [date_intervention, id_utilisateur, status, description, commentaire, photo, adresse]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'intervention:", error);
    throw error;
  }
};

module.exports = { getInterventions, postIntervention };
