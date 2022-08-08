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
        if (onlineUsers?.[user._id]) {
            socket.disconnect(true)
        } else {
            socket.join(user._id)
            socket.join('62f0fe63ab4c8d313de2a6c6') //62f0fe63ab4c8d313de2a6c6
            onlineUsers[user._id] = socket
        }

        next()
    })
    io.on('connection', (socket) => {
        console.log('users connected ' + socket.user.name)
        // socket.emit('newUser', socket.user)
        // make it id
        socket.on('msg', ({ to: Id, msg }) => {
            console.log(msg + ' to ' + onlineUsers[Id]?.user?.name || Id)

            io.to(Id).to(socket.id).emit('msg', { from: socket.user, msg })
        })
        socket.on('getOnlineUsers', () => {
            console.log(socket.user.name + ' request online users')

            const online = Object.keys(onlineUsers)
                .filter((id) => socket.user._id !== id)
                .map((id) => onlineUsers[id].user)

            io.to(socket.id).emit('getOnlineUsers', online)
        })
        socket.on('disconnect', (reason) => {
            // socket.emit('downUser', socket.user)
            console.log('user ' + socket.id + ' disconnected reason ' + reason)
        })
    })
}

module.exports = handelSocketIO
