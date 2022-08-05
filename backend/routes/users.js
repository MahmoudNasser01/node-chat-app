const express = require('express');
const jwt = require('jsonwebtoken')

require('dotenv').config()

const Route = express.Router();

const user = {
  username: "user",
  password: "user Password",
  role: "admin"
}
Route.
  post('/login', async (req, res) => {
    const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '24h' })

    res.send({ text: "auth user", token: token, })
  })
  .post('/signup', async (req, res) => {
    const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '24h' })

    res.send({ text: "user sign up", token: token })
  })

module.exports = Route
