const express = require('express');

const app = express();

const PORT = 3000;

let produtos = [
    {id: 1, nome: 'teclado', preco: 450.00},
    {id: 2, nome: 'mouse', preco: 400.00},
    {id: 3, nome: 'fone', preco: 350.00}
];

app.get('/', (req, res) =>{
    res.send('Bem vindo!')
})

app.get('/Sobre', (req, res) =>{
    res.send('Sobre a aplicação')
})

app.get('/api/produtos', (req, res) =>{
    res.json(produtos);
})


app.listen(PORT, () =>{
    console.log('Servidor rodando na porta 3000');
})