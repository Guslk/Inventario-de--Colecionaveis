// src/app.js
const express = require('express');
const app = express();

// Import models
require('./models/Colecionavel'); 
const Usuario = require('./models/Usuario');

app.use(express.json());

// Import routes
const colecionavelRoutes = require('./routes/colecionavelRoutes'); 
const usuarioRoutes = require('./routes/usuarioRoutes');

// Use routes
app.use('/api/colecionaveis', colecionavelRoutes); 
app.use('/api/usuarios', usuarioRoutes);


module.exports = app;