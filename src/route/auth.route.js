const express = require('express');
const router = express.Router();
const AuthController = require('./../controller/auth.controller');
const { verifyTokenPassword } = require('../middleware/token.middleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refresh);

module.exports = router;