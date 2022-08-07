const { auth } = require('../helpers/routes_middelware')

const Router = require('express').Router()

Router.get('/chats', auth, async (req, res) => {
    res.send({ text: 'hello from express' })
})

Router.get('/chat:id', (req, res) => {
    res.send({ text: 'hello from express' })
})
module.exports = Router
