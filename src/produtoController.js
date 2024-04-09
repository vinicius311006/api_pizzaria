const db = require('./db')
const joi = require('joi')
// const join = require('join')
const { json } = require('stream/consumers')


const produtoSchema = joi.object({
    id_produto: joi.string().required(),
    nome_produto: joi.string().required(),
    descricao: joi.string().required(),
    valor_unitario: joi.string().required(),
    imagem: joi.string().required()
})

exports.listarProduto = (req, res) => {
    db.query('SELECT * FROM produto', (err, result) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
        res.json(result)
    })
}

exports.buscarProdutoNome = (req, res) => {
    const { nome_produto } = req.params
    db.query('SELECT * FROM produto WHERE nome_produto LIKE ?', [`${nome_produto}%`], (err, result) => {
        if (err) {
            console.error('Erro ao buscar Produto:', err);
            res.status(500), json({ error: 'Erro interno do servidor' })
            return
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' })
        }
        res.json(result)
    })
}

exports.buscarProdutoId = (req, res) => {
    const { id_produto } = req.params
    db.query('SELECT * FROM produto WHERE id_produto = ?', id_produto, (err, result) => {
        if (err) {
            console.error('Erro ao buscar Produto:', err);
            res.status(500), json({ error: 'Erro interno do servidor' })
            return
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' })
        }
        res.json(result[0])
    })
}

exports.adicionarProduto = (req, res) => {
    const { id_produto, nome_produto, descricao, valor_unitario, imagem } = req.body
    const { error } = produtoSchema.validate({ id_produto, nome_produto, descricao, valor_unitario, imagem })

    if (error) {
        res.status(400).json({ error: 'Dados do produto inválido' })
        return
    }
    const novoProduto = {
        id_produto,
        nome_produto,
        descricao,
        valor_unitario,
        imagem
    }
    db.query('INSERT INDO produto SET ?', novoProduto, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar produto', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
        res.json({ message: 'Produto adicionado com sucesso' })
    })
}

exports.atualizarProduto = (req, res) => {
    const { id_produto } = req.params
    const { descricao, valor_unitario, imagem } = req.body
    const { error } = produtoSchema.validate({ descricao, valor_unitario, imagem })

    if (error) {
        res.status(400).json({ error: 'Dados do Produto Invalido' })
        return
    }
    const produtoAtualizado = {
        descricao,
        valor_unitario,
        imagem
    }
    db.query('UPDATE produto SET ? WHERE id_produto = ?', [produtoAtualizado, id_produto], (err, result) => {
        if (err) {
            console.error(500).json({ error: 'Erro interno do servidor' });
            return
        }
        res.json({ message: 'Produto atualizado com sucesso' })
    })
}

exports.deletarProduto = (req, res) => {
    const { id_produto } = req.params
    db.query('DELETE FROM produto WHERE id_produto = ?', id_produto, (err, result) => {
        if (err) {
            console.error('Erro ao deletar produto', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
    })
    res.json({ message: 'Produto deletado com sucesso' })
}