// Criando uma aplicação EXPRESS
const express = require('express'); //Importando
const cors = require('cors')
const path = require('path'); //Importando
const app = express();
const routes = require('./routes')
const db = require('./db')

app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers: Content-Type')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
        
    app.use(cors())
    next()
})

app.use('/', routes) // falar para o app usar o router
app.listen(3333, () => {
    console.log('Servidor Rodando');
})