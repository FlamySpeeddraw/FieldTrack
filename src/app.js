const express = require('express');
var cors = require('cors');
const app = express();
const sequelize = require('./config/connexion');

require('./task/cronArchive');
const { logMiddleware } = require('./middleware/logMiddleware');

app.use(express.json());
app.use(cors({ origin: "*" }));

const interventionsRouter = require("./route/intervention.route");
const authRouter = require('./route/auth.route');
const userRouter = require('./route/utilisateur.route');

app.use("/interventions", interventionsRouter);
app.use("/auth", authRouter);
app.use("/utilisateur", userRouter);

app.use(logMiddleware);
app.use(express.json());

module.exports = app;