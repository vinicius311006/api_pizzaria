// Criando uma aplicação EXPRESS
const express = require('express'); //Importando
const path = require('path'); //Importando
const app = express();
const routes = require('./routes')
const db = require('./db')

app.use(express.json())

app.use('/', routes) // falar para o app usar o router

app.listen(3333, () => {
    console.log('Servidor Rodando');
})