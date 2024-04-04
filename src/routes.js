const express = require('express')
const path = require('path')
const router = express.Router(); //isso permite que agente crie diferentes URLs e endpoints pai o frontend possa fazer chamadas

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})

const clienteController = require('./clienteController')
const loginController = require('./loginController')
const produtoController = require('./produtoController')

router.get('/clientes', loginController.autenticarToken, clienteController.listarClientes)
router.get('/clientes/:cpf', loginController.autenticarToken, clienteController.buscarCliente)
router.post('/cliente', clienteController.adicionarCliente)
router.patch('/cliente/:cpf', loginController.autenticarToken, clienteController.atualizarCliente)
router.delete('/cliente/:cpf', loginController.autenticarToken, clienteController.deletarCliente)
router.post('/login', loginController.loginCliente)

//POST: Aceita criar algum objetivo do servidor.
//PUT: Aceita substituir algum objeto do servidor.
//PATCH: Aceita alterar parcialmente algum objeto do servidor.
//DELETE: Informa por meio do URL o objeto a ser deletado.

router.get('/produto', produtoController.listarProduto)
router.get('/produto/:id', produtoController.buscarProdutoId)
router.get('/produto/nome/:nome_produto', produtoController.buscarProdutoNome)
router.post('/produto', produtoController.adicionarProduto)
router.patch('/produto', produtoController.atualizarProduto)
router.delete('/produto/:id', produtoController.deletarProduto)

module.exports = router