const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

let produtos = [
    {id: 1, nome: 'teclado', preco: 450.00},
    {id: 2, nome: 'mouse', preco: 400.00},
    {id: 3, nome: 'fone', preco: 350.00}
];
let nextId = 4;

app.get('/', (req, res) =>{
    res.send('Bem vindo!')
})

app.get('/Sobre', (req, res) =>{
    res.send('Sobre a aplicação')
})

app.get('/api/produtos', (req, res) =>{
    res.json(produtos);
})

app.post('/api/produtos', (req, res) =>{
    const {nome, preco} = req.body;

    if (!nome || preco === undefined) {
        return res.status(400).json({message: 'Nome e preço são obrigatorios'});
    }

    const novoProduto = {
        id: nextId++,
        nome,
        preco
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

app.put('/api/produtos/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex(p => p.id === id);

    if (produtoIndex !== -1){
        const {nome, preco} = req.body;

        if (!nome && preco === undefined){
            return res.status(400).json({message: 'Pelo menos um campo deve ser fornecido'})
        }
        produtos[produtoIndex] = {
            ...produtos[produtoIndex],
            nome: nome !== undefined ? nome : produtos[produtoIndex].nome,
            preco: preco !== undefined ? preco : produtos[produtoIndex].prreco
        };

        res.json(produtos[produtoIndex]);
    }
    else {
            res.status(404).json({message: 'produto não encontrado para atualização'});
        }
    
});

app.delete('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = produtos.length;

    produtos = produtos.filter(p => p.id !== id);

    if (produtos.length < initialLength) {
        res.status(204).send();
    } else {
      res.status(404).json({message: 'Produto não encontrado para exclusão'});
    }
});


app.listen(PORT, () =>{
    console.log('Servidor rodando na porta 3000');
})