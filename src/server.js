// src/app.js
const express = require('express');
const app = express();
const PORTA = 3000;


app.use(express.json());


const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');


app.use('/api/produtos', produtoRoutes);
app.use('/api/usuarios', usuarioRoutes);


app.get('/', (req, res) => {
  res.send('API de Produtos funcionando!');
});


app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});