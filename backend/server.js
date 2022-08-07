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

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const handelSocketIO = require('./routes/socketio')
const { getToken } = require('./helpers/token')
const io = new Server(server)

const port = process.env.PORT || 5000
/**
 * middleware for express server
 */

// body parser
app.use(express.json())
// cors for cros origin policy
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)
// morgan for debugging requests
app.use(morgan('dev'))

if (app.get('env') === 'development') {
    const users = [
        { username: 'test', email: 'test@email.com' },
        { username: 'user2', email: 'user2@email.com' },
        { username: 'user', email: 'user@email.com' },
    ]
    app.get('/', (req, res) => {
        if (users.length <= 0) {
            res.status(404)
            res.send('no more users')
        }
        const user = users.pop()
        res.cookie('jwt', getToken({ ...user }))

        res.sendFile(__dirname + '/public/index.html')
    })
}
/**
 * express routes
 */
app.use('/user', UserRoute)

app.use('/api', ApiRoute)

/**
 * middleware before routes to handel error from routes
 */
//  catch 404 and forward to error handler
app.use((req, res, next) => {
    next({ status: 404, message: 'page not found' })
})

//  error handler
app.use((err, req, res, next) => {
    //  render the error page
    res.status(err.status || 500)
    res.send({ error: err.message })
})

server.listen(port, () => {
    mongoose.connect(process.env.MONGO_DB_URL).then((v) => {
        console.log('connected to DB')
    })
    configSwagger(app, port)
    handelSocketIO(io)
})

module.exports = { io }