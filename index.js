const express = require("express");
require("dotenv").config();
var cors = require('cors');
const sequelize = require('./src/config/connexion');

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});

module.exports = { sequelize };

(async () => {
  try {
    await sequelize.authenticate();
    console.log("[DB] Connexion réussie à la base de données MySQL.");
  } catch (error) {
    console.error("[DB] Erreur de connexion :", error);
  }
})();

const uutilisateurRouter = require("./src/route/utilisateur.route");
app.use("/utilisateur", uutilisateurRouter);

const authRouter = require('./src/route/auth.route');
const userRouter = require("./route/utilisateur.route");

app.use("/auth", authRouter);
app.use("/utilisateur", userRouter);


app.listen(port, () => {
    console.log("[API] : Ouverture du serveur...");
    console.log(`[API] : Serveur démarré sur le port ${port}.`);
});

const onClose = () => {
    console.log("[API] : Fermeture du serveur...");
    client.close();
}

process.on('SIGINT', onClose);
process.on('SIGTERM', onClose);

module.exports = app;
