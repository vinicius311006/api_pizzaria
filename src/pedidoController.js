const db = require('./db')
const joi = require('joi')
// const join = require('path')
const { error } = require('console')

const pedidoSchema = joi.object({
    forma_pgto: joi.string().required(),
    qtde_itens: joi.string().required(),
    valor_total: joi.string().required(),
    observacao: joi.string(),
    id_cliente: joi.string().required(),
    id_entregador: joi.string().required(),
})

exports.listarPedidos = (req, res) => {
    db.query('SELECT * FROM pedido', (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
        res.json(result)
    })
}

exports.buscarPedidoId = (req, res) => {
    const { id_pedido } = req.params
    db.query('SELECT * FROM pedido WHERE id_pedido = ? ', id_pedido, (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'pedido não encontrado' })
            return
        }
        res.json(result)
    })
}

exports.buscarPedidoIdCliente = (req, res) => {
    const { id_cliente } = req.params
    db.query('SELECT * FROM pedido WHERE id_cliente = ? ', id_cliente, (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'pedido não encontrado' })
            return
        }
        res.json(result)
    })
}

exports.adicionarPedido = (req, res) => {
    const { forma_pgto, qtde_itens, valor_total, observacao, id_cliente, id_entregador } = req.body
    const { error } = pedidoSchema.validate({ forma_pgto, qtde_itens, valor_total, observacao, id_cliente, id_entregador })

    if (error) {
        res.status(400).json({ error: 'Dados de pedido inválido' })
        return
    }
    const novoPedido = {
        forma_pgto,
        qtde_itens,
        valor_total,
        observacao,
        id_cliente,
        id_entregador
    }
    db.query('INSERT INTO pedido SET ?', novoPedido, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar pedido', err);
            res.status(500).json({ error: 'Erro interono servidor' })
            return
        }
        res.json({ message: 'Pedido adicionado com sucesso' })
    })
}

exports.atualizarPedido = (req, res) => {
    const { id_pedido } = req.params
    const { forma_pgto, qtde_itens, valor_total, observacao, id_cliente, id_entregador } = req.body
    const { error } = pedidoSchema.validate({ forma_pgto, qtde_itens, valor_total, observacao, id_cliente, id_entregador })

    if (error) {
        res.status(400).json({ error: 'Dados do Pedido invalidos' })
        return
    }

    const pedidoAtualizado = {
        forma_pgto,
        qtde_itens,
        valor_total,
        observacao,
        id_cliente,
        id_entregador
    }

    db.query('UPDATE pedido SET ? WHERE id_pedido = ?', [pedidoAtualizado, id_pedido], (err, result) => {
        if (err) {
            console.error(500).json({ error: 'Erro interno do servidor' })
            return
        }
        res.json({ message: 'Pedido atualizado com sucesso' })
    })
}


exports.deletarPedido = (req, res) => {
    const { id_pedido } = req.params
    db.query('DELETE FROM pedido WHERE id_pedido = ?', id_pedido, (err, result) => {
        if (err) {
            console.error('Erro ao deletar pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
    })
    res.json({ message: 'Pedido deletado com sucesso' })
}