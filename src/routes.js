const express = require('express')
const path = require('path')
const router = express.Router(); //isso permite que agente crie diferentes URLs e endpoints pai o frontend possa fazer chamadas

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})

const clienteController = require('./clienteController')

router.get('/clientes', clienteController.listarClientes)
router.get('/clientes/:cpf', clienteController.buscarCliente)

router.post('/cliente', clienteController.adicionarCliente)

router.patch('/cliente/:cpf', clienteController.atualizarCliente)

router.delete('/cliente/:cpf', clienteController.deletarCliente)

module.exports = router