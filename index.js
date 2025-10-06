const express = require("express");
require("dotenv").config();
var cors = require('cors');
const mysql = require('mysql2');

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = connection;

const exempleRouter = require('./route/exemple.route');

app.use("/exemple", exempleRouter);

app.listen(port, () => {
    console.log("[API] : Ouverture du serveur...");
    connection.connect();
    console.log(`[API] : Serveur connecté à la base de données.`);
    console.log(`[API] : Serveur démarré sur le port ${port}.`);
});

const onClose = () => {
    console.log("[API] : Fermeture du serveur...");
    client.close();
}

process.on('SIGINT', onClose);
process.on('SIGTERM', onClose);

module.exports = app;