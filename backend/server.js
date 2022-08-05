const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const UserRoute = require('./routes/users')

const app = express()
dotenv.config()

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)
app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/user', UserRoute)

app.get('/api/chat', (req, res) => {
  res.send({ text: 'hello from express' })
})

app.get('/api/chat:id', (req, res) => {
  res.send({ text: 'hello from express' })
})

app.listen(process.env.PORT || 5000, () => {
  console.log('server is running...')
})
