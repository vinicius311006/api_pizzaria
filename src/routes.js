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

router.get('/clientes', loginController.autenticarToken, clienteController.listarClientes)
router.get('/clientes/:cpf', loginController.autenticarToken, clienteController.buscarCliente)
router.post('/cliente', clienteController.adicionarCliente)
router.patch('/cliente/:cpf', loginController.autenticarToken, clienteController.atualizarCliente)
router.delete('/cliente/:cpf', loginController.autenticarToken, clienteController.deletarCliente)
router.post('/login', loginController.loginCliente)

router.get('/produto', loginController.autenticarToken, produtoController.listarProduto)
router.get('/produto/id/:id_produto', loginController.autenticarToken, produtoController.buscarProdutoId)
router.get('/produto/nome/:nome_produto', loginController.autenticarToken, produtoController.buscarProdutoNome)
router.post('/produto', loginController.autenticarToken, produtoController.adicionarProduto)
router.patch('/produto', loginController.autenticarToken, produtoController.atualizarProduto)
router.delete('/produto/:id_produto', loginController.autenticarToken, produtoController.deletarProduto)

router.get('/pedido', loginController.autenticarToken, pedidoController.listarPedidos)
router.get('/pedido/:id_pedido', loginController.autenticarToken, pedidoController.buscarPedidoId)
router.get('/pedido/cliente/:id_cliente', loginController.autenticarToken, pedidoController.buscarPedidoIdCliente)
router.post('/pedido', loginController.autenticarToken, pedidoController.adicionarPedido)
router.patch('/pedido/:id_pedido', loginController.autenticarToken, pedidoController.atualizarPedido)
router.delete('.pedido/:id_pedido', loginController.autenticarToken, pedidoController.deletarPedido)

router.get('/item-pedido', loginController.autenticarToken, itemPedidoController.listarItemPedido)
router.get('/item-pedido/:id_item', loginController.autenticarToken, itemPedidoController.buscarItemPedidoId)
router.post('/item-pedido', loginController.autenticarToken, itemPedidoController.adicionarItem)
router.patch('/item-pedido', loginController.autenticarToken, itemPedidoController.atualizarItem)
router.delete('/item-pedido', loginController.autenticarToken, itemPedidoController.deletarItem)

module.exports = router
