// controllers/produtoController.js 


const Produto = require('../models/produto');


exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll(); 
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};


exports.getProdutoById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const produto = await Produto.findByPk(id); 
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).send('Produto não encontrado.');
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};


exports.createProduto = async (req, res) => {
    const { nome, preco } = req.body;
    if (!nome || preco === undefined) {
        return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
    }

    try {
        
        const novoProduto = await Produto.create({ nome, preco });
        res.status(201).json(novoProduto);
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};


exports.updateProduto = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco } = req.body;

    if (!nome || preco === undefined) {
        return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
    }

    try {
        
        const [updated] = await Produto.update({ nome, preco }, {
            where: { id: id }
        });

        if (updated) {
            const produtoAtualizado = await Produto.findByPk(id);
            res.json(produtoAtualizado);
        } else {
            res.status(404).json({ message: 'Produto não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};


exports.deleteProduto = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deleted = await Produto.destroy({
            where: { id: id }
        });

        if (deleted) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ message: 'Produto não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};