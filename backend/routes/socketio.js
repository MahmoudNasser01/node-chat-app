const jwt = require('jsonwebtoken')
const { decodeToken } = require('../helpers/token')
const User = require('../models/UserModel')
require('dotenv').config()
/**
 * @param {import('socket.io').Server} io
 */
const handelSocketIO = (io) => {
    io.use((socket, next) => {
        const user = decodeToken(socket.handshake.auth.token)
        socket.user = user
        socket.join(user.email)
        next()
    })
    io.on('connection', (socket) => {
        socket.on('msg', (msg, to) => {
            io.emit('msg', socket.user, msg)
        })

        socket.on('disconnect', (reason) => {
            console.log('user ' + socket.id + ' disconnected reason ' + reason)
        })
    })
}

module.exports = handelSocketIO
