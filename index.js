const express = require("express");
require("dotenv").config();
var cors = require('cors');
const mysql = require('mysql2/promise');

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = connection;

const authRouter = require('./route/auth.route');

app.use("/auth", authRouter);

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