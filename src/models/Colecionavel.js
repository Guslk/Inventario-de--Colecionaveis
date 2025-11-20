// src/models/Colecionavel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Colecionavel = sequelize.define('Colecionavel', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  condicao: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Colecionavel;