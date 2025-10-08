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


Utilisateur.belongsTo(Role, { foreignKey: "role_id", as: "role" });
Role.hasMany(Utilisateur, { foreignKey: "role_id", as: "utilisateurs" });

module.exports = { sequelize, Utilisateur, Role };

(async () => {
  try {
    await sequelize.authenticate();
    console.log("[DB] Connexion réussie à la base de données MySQL.");
  } catch (error) {
    console.error("[DB] Erreur de connexion :", error);
  }
})();

const userRouter = require("./route/utilisateur.route");
app.use("/utilisateur", userRouter);

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
