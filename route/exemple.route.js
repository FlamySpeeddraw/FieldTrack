const express = require('express');
const router = express.Router();
const ExempleController = require('./../controller/exemple.controller');

router.post('/exemple', ExempleController.postExemple);

router.get('/exemple', ExempleController.getExemple);

module.exports = router;