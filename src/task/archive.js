const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const logMessage = (message) => {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] ${message}\n`;
    console.log(log);

    const logDir = path.resolve('logs');
    const logPath = path.join(logDir, 'app.log');

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    fs.appendFileSync(logPath, log);
}

const archiveOldInterventions = async () => {
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);
        logMessage('Archive : Connexion à la base réussie');

        const insertQuery = `
      INSERT INTO HistoriqueIntervention (id_intervention, id_historique, commentaire, createdAt, updatedAt)
      SELECT id, commentaire, NOW(), createdAt, updatedAt
      FROM Interventions
      WHERE status = 'finished' AND date_intervention < NOW() - INTERVAL 3 MONTH
    `;
        const [insertResult] = await connection.execute(insertQuery);
        logMessage(`Archive : ${insertResult.affectedRows} intervention(s) archivées`);

        const deleteQuery = `
      DELETE FROM Interventions
      WHERE status = 'finished' AND date_intervention < NOW() - INTERVAL 3 MONTH
    `;
        const [deleteResult] = await connection.execute(deleteQuery);
        logMessage(`Archive : ${deleteResult.affectedRows} intervention(s) supprimées de la table principale`);

        logMessage('Archive : Archivage terminé avec succès');

    } catch (error) {
        logMessage(`Archive : Erreur lors de l’archivage : ${error.message}`);
    } finally {
        if (connection) {
            await connection.end();
            logMessage('Archive : Connexion à la base fermée');
        }
    }
}

module.exports = { archiveOldInterventions };