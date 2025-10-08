const express = require("express");
const router = express.Router();
const InterventionController = require("../controller/intervention.controller");

router.get("/",  InterventionController.getInterventions);

router.get("/:id", InterventionController.getInterventionById);

router.post("/", InterventionController.postIntervention);

router.put("/:id", InterventionController.updateIntervention);

router.delete("/:id", InterventionController.deleteIntervention);

module.exports = router;
