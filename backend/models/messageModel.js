const mongoose = require('mongoose')

const messageModel = mongoose.Schema({
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            trim: true,
            required: true
        },
        file: {
            type: String,
            trim: true
        },
        status:
            {
                type: String,
                enum: ['sent', 'delivered', 'read'],
            },
        readBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ]
    },
    {
        timestamps: true
    });


const Message = mongoose.model('Message', messageModel)
module.exports = Message