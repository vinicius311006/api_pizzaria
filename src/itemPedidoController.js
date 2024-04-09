const db = require('./db')
const joi = require('joi')
const { error } = require('console')

const itemPedidoSchema = joi.object({
    qtde: joi.string().required(),
    valor_parcial: joi.string().required(),
    id_produto: joi.string().required(),
    id_pedido: joi.string().required()
})

exports.listarItemPedido = (req, res) => {
    db.query('SELECT * FROM item_pedido', (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
        res.json(result)
    })
}

exports.buscarItemPedidoId = (req, res) => {
    const { id_item } = req.params
    db.query('SELECT * FROM item_pedido WHERE id_item = ? ', id_item, (err, result) => {
        if (err) {
            console.error('Erro ao buscar Item:', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Item não encontrado' })
            return
        }
        res.json(result)
    })
}

exports.adicionarItem = (req, res) => {
    const { qtde, valor_parcial, id_produto, id_pedido } = req.body
    const { error } = itemPedidoSchema.validate({ qtde, valor_parcial, id_produto, id_pedido })

    if (error) {
        res.status(400).json({ error: 'Dados de Item inválido' })
        return
    }
    const novoItem = {
        qtde,
        valor_parcial,
        id_produto,
        id_pedido
    }
    db.query('INSERT INTO item_pedido SET ?', novoItem, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar Item', err);
            res.status(500).json({ error: 'Erro interono servidor' })
            return
        }
        res.json({ message: 'Item adicionado com sucesso' })
    })
}

exports.atualizarItem = (req, res) => {
    const { id_item } = req.params
    const { qtde, valor_parcial, id_produto, id_pedido } = req.body
    const { error } = itemPedidoSchema.validate({ qtde, valor_parcial, id_produto, id_pedido })

    if (error) {
        res.status(400).json({ error: 'Dados do Item invalidos' })
        return
    }

    const itemAtualizado = {
        qtde,
        valor_parcial,
        id_produto,
        id_pedido
    }

    db.query('UPDATE item_pedido SET ? WHERE id_item = ?', [itemAtualizado, id_item], (err, result) => {
        if (err) {
            console.error(500).json({ error: 'Erro interno do servidor' })
            return
        }
        res.json({ message: 'Item atualizado com sucesso' })
    })
}

exports.deletarItem = (req, res) => {
    const { id_item } = req.params
    db.query('DELETE FROM item_pedido WHERE id_item = ?', id_item, (err, result) => {
        if (err) {
            console.error('Erro ao deletar item:', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
        res.json({ message: 'Pedido deletado com sucesso' })
    })
}