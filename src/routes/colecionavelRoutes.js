// src/routes/colecionavelRoutes.js
const express = require('express');
const router = express.Router();
const colecionavelController = require('../controllers/colecionavelController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas Públicas
router.get('/', colecionavelController.listar);
router.get('/resumo', colecionavelController.resumo);
router.get('/:id', colecionavelController.obterPorId);


// Rotas Protegidas (Precisam de Token)
router.post('/', authMiddleware.verificaToken, colecionavelController.criar);
router.put('/:id', authMiddleware.verificaToken, colecionavelController.atualizar);
router.delete('/:id', authMiddleware.verificaToken, colecionavelController.deletar);

module.exports = router;