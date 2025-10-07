const express = require('express');
const app = express();

require('./task/cronArchive');
const { logMiddleware } = require('./middleware/logMiddleware');
const sequelize = require('./config/connection.js');

app.use(logMiddleware);
app.use(express.json());

module.exports = app;