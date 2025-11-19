// src/app.js
const express = require('express');
const app = express();
const PORTA = 3000;

const sequelize = require('./database'); 
const Produto = require('./models/produto'); 

app.use(express.json());



const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

async function syncDatabase() {
    try {
       
        await sequelize.sync();
        console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('Erro ao sincronizar modelos:', error);
    }
}


app.use('/api/produtos', produtoRoutes);
app.use('/api/usuarios', usuarioRoutes);


app.get('/', (req, res) => {
  res.send('API de Produtos funcionando!');
});

app.get('/api/health-check', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = app;