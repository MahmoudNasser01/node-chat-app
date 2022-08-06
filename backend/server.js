const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const UserRoute = require('./routes/users')
const ApiRoute = require('./routes/apis')
const configSwagger = require('./swagger')
const mongoose = require('mongoose')

const app = express()
dotenv.config()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

app.use(morgan('dev'))

app.use('/user', UserRoute)

app.use('/api', ApiRoute)

app.listen(port, () => {
  mongoose.connect(process.env.MONGO_DB_URL).then((v) => {
    console.log('connected to DB')
  })
  configSwagger(app, port)
})
