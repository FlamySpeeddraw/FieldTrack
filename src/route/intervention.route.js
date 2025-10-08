const express = require("express");
const router = express.Router();
const InterventionController = require("../controller/intervention.controller");

/**
 * @swagger
 * tags:
 *   name: Interventions
 *   description: API pour gérer les interventions
 */

/**
 * @swagger
 * /interventions:
 *   get:
 *     tags: [Interventions]
 *     summary: Retourne la liste des interventions
 *     responses:
 *       200:
 *         description: Liste des interventions
 */
router.get("/",  InterventionController.getInterventions);

/**
 * @swagger
 * /interventions/{id}:
 *   get:
 *     tags: [Interventions]
 *     summary: Retourne une intervention par id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'intervention
 *     responses:
 *       200:
 *         description: Intervention trouvée
 *       404:
 *         description: Non trouvée
 */
router.get("/:id", InterventionController.getInterventionById);

/**
 * @swagger
 * /interventions/user/{id}:
 *   get:
 *     tags: [Interventions]
 *     summary: Retourne les interventions d'un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des interventions
 */
router.get("/user/:id", InterventionController.getInterventionByUserId);

/**
 * @swagger
 * /interventions:
 *   post:
 *     tags: [Interventions]
 *     summary: Crée une nouvelle intervention
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_utilisateur
 *             properties:
 *               date_intervention:
 *                 type: string
 *                 format: date-time
 *                 description: Date/heure de l'intervention
 *               id_utilisateur:
 *                 type: integer
 *                 description: ID de l'utilisateur responsable (doit exister)
 *               status:
 *                 type: string
 *                 description: Statut de l'intervention
 *               description:
 *                 type: string
 *               commentaire:
 *                 type: string
 *               photo:
 *                 type: string
 *                 description: URL ou encodage de la photo
 *               adresse:
 *                 type: string
 *           example:
 *             date_intervention: "2025-10-08T14:30:00Z"
 *             id_utilisateur: 1
 *             status: "pending"
 *             description: "Remplacement de la pièce défectueuse"
 *             commentaire: "Appeler avant d'arriver"
 *             photo: "https://example.com/photo.jpg"
 *             adresse: "12 rue Exemple, 75000 Paris"
 *     responses:
 *       201:
 *         description: Créée
 */
router.post("/", InterventionController.postIntervention);

/**
 * @swagger
 * /interventions/{id}:
 *   put:
 *     tags: [Interventions]
 *     summary: Met à jour une intervention
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'intervention
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               commentaire:
 *                 type: string
 *               photo:
 *                 type: string
 *           example:
 *             status: "done"
 *             commentaire: "Intervention terminée, pièce remplacée"
 *             photo: "https://example.com/photo_after.jpg"
 */
router.put("/:id", InterventionController.updateIntervention);

/**
 * @swagger
 * /interventions/{id}:
 *   delete:
 *     tags: [Interventions]
 *     summary: Supprime une intervention
 */
router.delete("/:id", InterventionController.deleteIntervention);

module.exports = router;