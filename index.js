const express = require("express");
require("dotenv").config();
var cors = require('cors');
const sequelize = require('./src/config/connexion');

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

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
