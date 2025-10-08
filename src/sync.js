const db = require('./config/connexion.js');

const sync = async () => {
    try {
        await db.sequelize.sync({ alter: true });
        console.log(" Base de données synchronisée.");
    } catch (error) {
        console.log(" Échec de la synchronisation :", error);
    }
}

sync();