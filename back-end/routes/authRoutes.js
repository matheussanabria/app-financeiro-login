// /back-end/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Rota para registrar-se
router.post('/register', registerUser);

// Rota para login
router.post('/login', loginUser);

module.exports = router;
