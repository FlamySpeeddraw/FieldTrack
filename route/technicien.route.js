const express = require("express");
const router = express.Router();
const technicienController = require("./../controller/technicien.controller");

router.post("/", technicienController.createTechnicien);

router.get("/", technicienController.getAllTechniciens);
router.get("/:id", technicienController.getTechnicienById);

router.put("/:id", technicienController.updateTechnicien);

router.delete("/:id", technicienController.deleteTechnicien);

module.exports = router;
