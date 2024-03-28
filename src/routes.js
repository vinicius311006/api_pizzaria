const express = require('express')
const path = require('path')
const router = express.Router(); //isso permite que agente crie diferentes URLs e endpoints pai o frontend possa fazer chamadas

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})

const clienteController = require('./clienteController')


router.get('/clientes', clienteController.listarClientes)

module.exports = router