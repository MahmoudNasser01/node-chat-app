const {auth} = require('../helpers/routes_middelware')
const Chat = require('../models/chatModel')
const User = require("../models/UserModel");

const Router = require('express').Router()

Router.get('/chats', auth, async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("participants", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name picture email",
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})
// todo: return single chat data
Router.get('/chat:id', (req, res) => {
    res.send({text: 'hello from express'})
})

// todo: update chat data
Router.put('/chat:id', (req, res) => {
    res.send("endpoint for update chat data")
})

Router.post('/chat', auth, async (req, res) => {
    const {userId} = req.body;
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        type: "direct",
        $and: [
            {participants: {$elemMatch: {$eq: req.user._id}}},
            {participants: {$elemMatch: {$eq: userId}}},
        ],
    })
        .populate("participants", "-password")
        .populate("latestMessage");
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    const otherUser = await User.findById(userId);
    if (isChat.length > 0) {
        console.log(isChat[0]);
        res.send(isChat[0]);
    } else {
        var chatData = {
            name: otherUser.name,
            type: "direct",
            participants: [req.user._id, userId],
            picture: otherUser.picture,
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate(
                "participants",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})

Router.post('/group', auth, async (req, res) => {
    if (!req.body.participants || !req.body.name) {
        return res.status(400).send({message: "Please Fill all the fields"});
    }

    var participants = JSON.parse(req.body.participants);
    console.log(participants);
    if (participants.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }


    try {
        const groupChat = await Chat.create({
            name: req.body.name,
            participants: participants,
            type: "group",
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
            .populate("participants", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

})
module.exports = Router
