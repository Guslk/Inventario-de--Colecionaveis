// src/routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');


const { verificaToken } = require('../middlewares/authMiddleware');


router.get('/', produtoController.getAllProdutos);
router.get('/:id', produtoController.getProdutoById);


router.post('/', verificaToken, produtoController.createProduto);
router.put('/:id', verificaToken, produtoController.updateProduto);
router.delete('/:id', verificaToken, produtoController.deleteProduto);

module.exports = router;