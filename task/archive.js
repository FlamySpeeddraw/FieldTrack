import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

function logMessage(message) {
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

export async function archiveOldInterventions() {
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);
        logMessage('Connexion à la base réussie');

        const insertQuery = `
      INSERT INTO HistoriqueIntervention (id_intervention, id_historique, commentaire)
      SELECT id_intervention, commentaire, NOW()
      FROM Intervention
      WHERE status = 'finished' AND date_intervention < NOW() - INTERVAL 3 MONTH
    `;
        const [insertResult] = await connection.execute(insertQuery);
        logMessage(`${insertResult.affectedRows} intervention(s) archivées`);

        const deleteQuery = `
      DELETE FROM Intervention
      WHERE status = 'finished' AND date_intervention < NOW() - INTERVAL 3 MONTH
    `;
        const [deleteResult] = await connection.execute(deleteQuery);
        logMessage(`${deleteResult.affectedRows} intervention(s) supprimées de la table principale`);

        logMessage('Archivage terminé avec succès');

    } catch (error) {
        logMessage(`Erreur lors de l’archivage : ${error.message}`);
    } finally {
        if (connection) {
            await connection.end();
            logMessage('Connexion à la base fermée');
        }
    }
}
