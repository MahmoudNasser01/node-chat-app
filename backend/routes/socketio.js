const jwt = require('jsonwebtoken')
const { decodeToken } = require('../helpers/token')
const User = require('../models/UserModel')
require('dotenv').config()
/**
 * @param {import('socket.io').Server} io
 */
const handelSocketIO = (io) => {
    const onlineUsers = {}
    io.use((socket, next) => {
        const user = decodeToken(socket.handshake.auth.token)
        socket.user = user
        if (onlineUsers?.[user.email]) {
            socket.disconnect(true)
        } else {
            socket.join(user.email)
            onlineUsers[user.email] = socket
        }

        next()
    })
    io.on('connection', (socket) => {
        console.log('users connected ' + socket.user.name)
        // socket.emit('newUser', socket.user)
        socket.on('msg', ({ to: toUser, msg }) => {
            console.log(msg + ' to ' + toUser.name)

            io.to(toUser.email)
                .to(socket.id)
                .emit('msg', { from: socket.user, msg })
        })
        socket.on('getOnlineUsers', () => {
            console.log(socket.user.name + ' request online users')

            const online = Object.keys(onlineUsers)
                .filter((email) => socket.user.email !== email)
                .map((email) => onlineUsers[email].user)

            io.to(socket.id).emit('getOnlineUsers', online)
        })
        socket.on('disconnect', (reason) => {
            // socket.emit('downUser', socket.user)
            console.log('user ' + socket.id + ' disconnected reason ' + reason)
        })
    })
}

module.exports = handelSocketIO
