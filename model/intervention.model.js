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

module.exports = { getInterventions };
