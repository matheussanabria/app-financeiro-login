const express = require('express');
const { getUserProfile } = require('../controllers/userController'); // Importa o controlador do usuário
const { authenticateToken } = require('../middleware/authMiddleware'); // Importa o middleware de autenticação
const router = express.Router();

// Rota para obter os dados do usuário autenticado
router.get('/me', authenticateToken, getUserProfile);

module.exports = router;
