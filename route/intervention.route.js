const express = require("express");
const router = express.Router();
const InterventionController = require("../controller/intervention.controller");

router.get("/",  InterventionController.getInterventions);

module.exports = router;
