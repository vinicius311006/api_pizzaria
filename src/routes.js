const express = require('express')
const path = require('path')
const router = express.Router(); //isso permite que agente crie diferentes URLs e endpoints pai o frontend possa fazer chamadas

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})

//POST: Aceita criar algum objetivo do servidor.
//PUT: Aceita substituir algum objeto do servidor.
//PATCH: Aceita alterar parcialmente algum objeto do servidor.
//DELETE: Informa por meio do URL o objeto a ser deletado.

const clienteController = require('./clienteController')
const loginController = require('./loginController')
const produtoController = require('./produtoController')
const pedidoController = require('./pedidoController')
const itemPedidoController = require('./itemPedidoController')

router.get('/cliente', loginController.autenticarToken, clienteController.listarClientes)
router.get('/cliente/:cpf', loginController.autenticarToken, clienteController.buscarCliente)
router.post('/cliente', clienteController.adicionarCliente)
router.patch('/cliente/:cpf', loginController.autenticarToken, clienteController.atualizarCliente)
router.delete('/cliente/:cpf', loginController.autenticarToken, clienteController.deletarCliente)
router.post('/login', loginController.loginCliente)

router.get('/produto', produtoController.listarProduto)
router.get('/produto/:id_produto', produtoController.buscarProdutoId)
router.get('/produto/nome/:nome_produto', produtoController.buscarProdutoNome)
router.post('/produto', produtoController.adicionarProduto)
router.patch('/produto/:id_produto', produtoController.atualizarProduto)
router.delete('/produto/:id_produto', produtoController.deletarProduto)

router.get('/pedido', pedidoController.listarPedidos)
router.get('/pedido/:id_pedido', pedidoController.buscarPedidoId)
router.get('/pedido/cliente/:id_cliente', pedidoController.buscarPedidoIdCliente)
router.post('/pedido', pedidoController.adicionarPedido)
router.patch('/pedido/:id_pedido', pedidoController.atualizarPedido)
router.delete('/pedido/:id_pedido', pedidoController.deletarPedido)

router.get('/item-pedido', itemPedidoController.listarItemPedido)
router.get('/item-pedido/:id_item', itemPedidoController.buscarItemPedidoId)
router.post('/item-pedido', itemPedidoController.adicionarItem)
router.patch('/item-pedido', itemPedidoController.atualizarItem)
router.delete('/item-pedido', itemPedidoController.deletarItem)

module.exports = router
