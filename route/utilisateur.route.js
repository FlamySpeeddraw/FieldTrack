const express = require("express");
const router = express.Router();
const utilisateurController = require("./../controller/utilisateur.controller");

// CREATE
router.post("/", utilisateurController.createUtilisateur);

// READ ALL & ONE
router.get("/", utilisateurController.getAllUtilisateurs);
router.get("/:id", utilisateurController.getUtilisateurById);

// UPDATE
router.put("/:id", utilisateurController.updateUtilisateur);

// DELETE
router.delete("/:id", utilisateurController.deleteUtilisateur);

module.exports = router;
