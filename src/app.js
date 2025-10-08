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

// Requires en haut du fichier (ajoute-les avec les autres require)
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// ... plus bas, après le montage des routes
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'FieldTrack API', version: '1.0.0' },
  },
  apis: ['./src/route/*.js', './src/controller/*.js'] // chemins vers fichiers commentés en JSDoc
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(logMiddleware);

module.exports = app;