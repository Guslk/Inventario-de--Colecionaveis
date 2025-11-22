// src/controllers/colecionavelController.js
const Colecionavel = require('../models/Colecionavel');

exports.listar = async (req, res) => {
  try {
    const { categoria, ano } = req.query;
    const where = {};
    if (categoria) {
      where.categoria = categoria;
    }
    if (ano) {
      where.ano = ano;
    }
    const itens = await Colecionavel.findAll({
      where: where
    });
    res.json(itens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar itens.' });
  }
};

exports.obterPorId = async (req, res) => {
  try {
    const item = await Colecionavel.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item não encontrado.' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar item.' });
  }
};

exports.criar = async (req, res) => {
  try {
    // O middleware de auth coloca o usuário em req.usuario
    const idUsuarioLogado = req.usuario.id;
    
    const { nome, categoria, ano, condicao } = req.body;

    const novoItem = await Colecionavel.create({
      nome,
      categoria,
      ano,
      condicao,
      usuarioId: idUsuarioLogado // Vincula o item ao dono!
    });

    res.status(201).json(novoItem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar item.' });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const idUsuarioLogado = req.usuario.id;
    const item = await Colecionavel.findByPk(req.params.id);

    if (!item) return res.status(404).json({ error: 'Item não encontrado.' });

    // Verificação de Segurança: Só o dono pode editar
    if (item.usuarioId !== idUsuarioLogado) {
        return res.status(403).json({ error: 'Você não tem permissão para alterar este item.' });
    }

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar item.' });
  }
};

exports.deletar = async (req, res) => {
  try {
    const idUsuarioLogado = req.usuario.id;
    const item = await Colecionavel.findByPk(req.params.id);

    if (!item) return res.status(404).json({ error: 'Item não encontrado.' });

    // Verificação de Segurança: Só o dono pode deletar
    if (item.usuarioId !== idUsuarioLogado) {
        return res.status(403).json({ error: 'Você não tem permissão para deletar este item.' });
    }

    await item.destroy();
    res.json({ message: 'Item removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar item.' });
  }
};