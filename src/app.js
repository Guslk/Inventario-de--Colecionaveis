// src/app.js
const express = require('express');
const app = express();

const sequelize = require('./database'); 
const Produto = require('./models/produto');
const Usuario = require('./models/Usuario');

app.use(express.json());



const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');


app.use('/api/produtos', produtoRoutes);
app.use('/api/usuarios', usuarioRoutes);


app.get('/', (req, res) => {
  res.send('API de Produtos funcionando!');
});

app.get('/api/health-check', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = app;