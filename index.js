const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[API] Serveur démarré sur le port ${port}.`);
});

const onClose = async () => {
  console.log("[API] Fermeture du serveur...");
  await sequelize.close();
  process.exit(0);
};

process.on("SIGINT", onClose);
process.on("SIGTERM", onClose);
