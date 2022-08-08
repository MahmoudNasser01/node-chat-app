const mongoose = require('mongoose')

const chatModel = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        type: {
            type: String,
            enum: ['direct', 'group'],
        },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                role: String,
            },
        ],
        picture: {
            type: String,
            required: true,
            default:
                'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
        },
        latestMessage: {
            type: String,
            ref: 'Message',
        },
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
            },
        ],
    },
    {
        timestamps: true,
    }
)


const Chat = mongoose.model('Chat', chatModel)
module.exports = Chat