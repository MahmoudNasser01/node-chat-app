const { auth } = require('../helpers/routes_middelware')
const Chat = require('../models/chatModel')

const Router = require('express').Router()

Router.get('/chats', auth, async (req, res) => {
    res.send({ text: 'hello from express' })
})

Router.get('/chat:id', (req, res) => {
    res.send({ text: 'hello from express' })
})
Router.post('/chat', async (req, res) => {
    const { name, type } = req.body
    const chat = (await Chat.create({ name, type })).toObject()
    res.status(200)
    res.send(chat)
})
module.exports = Router
