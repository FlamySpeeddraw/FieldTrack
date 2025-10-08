const express = require("express");
require("dotenv").config();
var cors = require('cors');

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));


const interventionsRouter = require("./src/route/intervention.route");
app.use("/interventions", interventionsRouter);

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