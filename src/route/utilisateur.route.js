const express = require("express");
const router = express.Router();
const utilisateurController = require("../controller/utilisateur.controller");

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /utilisateur:
 *   post:
 *     tags: [Utilisateurs]
 *     summary: Crée un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mail
 *               - mdp
 *               - role
 *             properties:
 *               mail:
 *                 type: string
 *                 description: Adresse email de l'utilisateur
 *               mdp:
 *                 type: string
 *                 description: Mot de passe (hashé côté serveur)
 *               role:
 *                 type: string
 *                 description: Nom du rôle
 *           example:
 *             mail: "jdoe@example.com"
 *             mdp: "P@ssw0rd123"
 *             role: "technicien"
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post("/", utilisateurController.createUtilisateur);

/**
 * @swagger
 * /utilisateur:
 *   get:
 *     tags: [Utilisateurs]
 *     summary: Récupère tous les utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get("/", utilisateurController.getAllUtilisateurs);

/**
 * @swagger
 * /utilisateur/{id}:
 *   get:
 *     tags: [Utilisateurs]
 *     summary: Récupère un utilisateur par id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Non trouvé
 */
router.get("/:id", utilisateurController.getUtilisateurById);

/**
 * @swagger
 * /utilisateur/{id}:
 *   put:
 *     tags: [Utilisateurs]
 *     summary: Met à jour un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
	*             type: object
	*             properties:
	*               mail:
	*                 type: string
	*                 description: Adresse email
	*               mdp:
	*                 type: string
	*                 description: Mot de passe
	*               role:
	*                 type: string
	*                 description: nom du rôle
	*           example:
	*             mail: "jdoe.updated@example.com"
	*             mdp: "N3wP@ssw0rd"
	*             role: "technicien"
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 */
router.put("/:id", utilisateurController.updateUtilisateur);

/**
 * @swagger
 * /utilisateur/{id}:
 *   delete:
 *     tags: [Utilisateurs]
 *     summary: Supprime un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */
router.delete("/:id", utilisateurController.deleteUtilisateur);

module.exports = router;