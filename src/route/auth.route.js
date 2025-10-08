const express = require('express');
const router = express.Router();
const AuthController = require('./../controller/auth.controller');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification (register, login, refresh)
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Enregistre un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
	*             required:
	*               - mail
	*               - mdp
	*             properties:
	*               mail:
	*                 type: string
	*                 description: Adresse email
	*               mdp:
	*                 type: string
	*                 description: Mot de passe en clair (sera hashé côté serveur)
	*           example:
	*             mail: "jdoe@example.com"
	*             mdp: "P@ssw0rd123"
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Authentifie un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
	*             required:
	*               - mail
	*               - mdp
	*             properties:
	*               mail:
	*                 type: string
	*               mdp:
	*                 type: string
	*           example:
	*             mail: "jdoe@example.com"
	*             mdp: "P@ssw0rd123"
	*     responses:
	*       200:
	*         description: Connexion réussie
	*         content:
	*           application/json:
	*             schema:
	*               type: object
	*               properties:
	*                 token:
	*                   type: string
	*                   description: JWT d'accès
	*                 newRefreshToken:
	*                   type: string
	*                   description: Refresh token en clair à stocker côté client
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Renouvelle un token via refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
	*             required:
	*               - refreshToken
	*             properties:
	*               refreshToken:
	*                 type: string
	*           example:
	*             refreshToken: "<refresh-token-from-login>"
	*     responses:
	*       200:
	*         description: Token renouvelé
	*         content:
	*           application/json:
	*             schema:
	*               type: object
	*               properties:
	*                 token:
	*                   type: string
	*                 newRefreshToken:
	*                   type: string
 */
router.post('/refresh', AuthController.refresh);

module.exports = router;