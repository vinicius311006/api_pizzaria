const db = require('./db')
const joi = require('joi')
const bcrypt = require('bcrypt')
const join = require('path')
const { error } = require('console')

const clienteSchema = joi.object({
    nome: joi.string().required(),
    endereco: joi.string().required(),
    bairro: joi.string().required(),
    cep: joi.string().required(),
    cpf: joi.string().length(11).required(),
    login: joi.string().required(), //login: joi.string().email.required(), para email
    senha: joi.string().min(6).required()
})

exports.listarClientes = (req, res) => {
    db.query('SELECT * FROM cliente', (err, result) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err)
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
        res.json(result)
    })
}

exports.buscarCliente = (req, res) => {
    const { cpf } = req.params
    db.query('SELECT * FROM cliente WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err)
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' })
            return
        }
        res.json(result[0])
    })
}

exports.adicionarCliente = (req, res) => {
    const { nome, endereco, bairro, cep, cpf, login, senha } = req.body
    const { error } = clienteSchema.validate({ nome, endereco, bairro, cep, cpf, login, senha }) //aq é para verificar os dados recebido e garantir a integridade para dps add no banco de dados

    if (error) {
        res.status(400).json({ error: 'Dados de cliente inválido' })
        return
    }
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err)
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
        const novoCliente = {
            nome,
            endereco,
            bairro,
            cep,
            cpf,
            login,
            senha: hash
        }
        db.query('INSERT INTO cliente SET ?', novoCliente, (err, result) => {
            if (err) {
                console.error('Erro ao adicionar cliente:', err)
                res.status(500).json({ error: 'Erro interno do servidor' })
                return
            }
            res.json({ message: 'Cliente adicionado com sucesso' })
        })
    })
}

exports.atualizarCliente = (req, res) => {
    const { cpf } = req.params
    const { nome, endereco, bairro, cep, login, senha } = req.body
    const { error } = clienteSchema.validate({ nome, endereco, bairro, cep, cpf, login, senha })

    if (error) {
        res.status(400).json({ error: 'Dados de cliente invalidos' })
        return
    }
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err)
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
        const clienteAtualizado = {
            nome,
            endereco,
            bairro,
            cep,
            login,
            senha: hash
        }
        db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteAtualizado, cpf], (err, result) => {
            if (err) {
                console.error(500).json({ error: 'Erro interno do servidor' })
                return
            }
            res.json({ message: 'Cliente atualizado com sucesso' })
        })
    })
}

exports.deletarCliente = (req, res) => {
    const { cpf } = req.params
    db.query('DELETE FROM cliente WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro ao deletar cliete:', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return
        }
    })
    res.json({ message: 'Cliente deletado com sucesso' })
}
