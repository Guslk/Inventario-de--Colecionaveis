// src/routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', usuarioController.criarUsuario);

router.post('/login', usuarioController.login);

router.delete('/:id', authMiddleware.verificaToken, usuarioController.deletarUsuario);

module.exports = router;