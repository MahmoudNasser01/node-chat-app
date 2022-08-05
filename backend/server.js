const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const UserRoute = require('./routes/users')
const configSwagger = require('./swagger')
const { default: mongoose, connect } = require('mongoose')

const app = express()
dotenv.config()
const port = process.env.PORT || 5000

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//   })
// )

app.use(morgan('dev'))

app.use('/user', UserRoute)

app.get('/api/chat', (req, res) => {
  res.send({ text: 'hello from express' })
})

app.get('/api/chat:id', (req, res) => {
  res.send({ text: 'hello from express' })
})

app.listen(port, () => {
  configSwagger(app, port)
})
