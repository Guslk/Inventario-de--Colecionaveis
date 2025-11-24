// src/app.js
const express = require('express');
const app = express();


require('./models/Colecionavel'); 
const Usuario = require('./models/Usuario');

app.use(express.json());


const colecionavelRoutes = require('./routes/colecionavelRoutes'); 
const usuarioRoutes = require('./routes/usuarioRoutes');


app.use('/api/colecionaveis', colecionavelRoutes); 
app.use('/api/usuarios', usuarioRoutes);


module.exports = app;