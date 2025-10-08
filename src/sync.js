const db = require('./config/connexion.js');

const sync = async () => {

    db.sequelize.sync({alter: true})
        .then(async () => {
            //dataset(db);
            console.log(" Base de données synchronisée.");
        })
        .catch((err) => {
            console.error(" Échec de la synchronisation :", err);
        });
}

sync();