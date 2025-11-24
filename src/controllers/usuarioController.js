// src/controllers/usuarioController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario'); 


const JWT_SECRET = process.env.JWT_SECRET;

exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, codigoSecreto } = req.body;

    
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    let isAdmin = false;
    
    if (codigoSecreto === 'MASTER') {
        isAdmin = true;
    }

    
    const senhaCriptografada = bcrypt.hashSync(senha, 10);

    
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      isAdmin: isAdmin
    });

   
    res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      isAdmin: novoUsuario.isAdmin
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
      { id: usuario.id, nome: usuario.nome, isAdmin: usuario.isAdmin },
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

exports.deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params; 
        const { isAdmin } = req.usuario; 

        
        if (!isAdmin) {
            return res.status(403).json({ message: "Apenas administradores podem deletar usuários." });
        }

        
        const usuarioParaDeletar = await Usuario.findByPk(id);
        if (!usuarioParaDeletar) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        
        await usuarioParaDeletar.destroy();

        res.status(200).json({ message: "Usuário deletado (banido) com sucesso." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar usuário." });
    }
};