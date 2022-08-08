const mongoose = require('mongoose')

const userModel = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
        },
        picture: {
            type: String,
            required: true,
            default:
                'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
        },
        password: {
            type: String,
            required: true,
        },
        chats: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Chat",
            }
        ],
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }]
    },
    {
        timestamps: true,
    }
)


const User = mongoose.model('User', userModel)
module.exports = User