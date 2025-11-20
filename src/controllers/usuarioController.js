// src/controllers/usuarioController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario'); 


const JWT_SECRET = process.env.JWT_SECRET;

exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    
    const senhaCriptografada = bcrypt.hashSync(senha, 10);

    
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada
    });

   
    res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar usuário." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    
    const usuario = await Usuario.findOne({ where: { email } });
    
    
    if (!usuario) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    
    const senhaValida = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    
    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login bem-sucedido!",
      token: token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};