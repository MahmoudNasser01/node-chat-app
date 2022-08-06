const Router = require('express').Router()

Router.get('/chat', (req, res) => {
  res.send({ text: 'hello from express' })
})

Router.get('/chat:id', (req, res) => {
  res.send({ text: 'hello from express' })
})
module.exports = Router
