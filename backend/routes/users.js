const express = require('express');
const jwt = require('jsonwebtoken')
const { auth } = require('../routes_middelware')
require('dotenv').config()

const Route = express.Router()

const user = {
  username: 'user',
  password: 'user Password',
  role: 'admin',
}

/**
 * @openapi
 * /user:
 *  post:
 *     description: login new user
 *     responses:
 *       200:
 *         description: API is  running
 */

Route.post('/login', async (req, res) => {
  const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '24h' })
  res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 })
  res.send({ text: 'auth user', token: token })
})
  .post('/signup', async (req, res) => {
    const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '24h' })
    res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 })
    res.send({ text: 'user sign up', token: token })
  })
  .get('/logout', auth, async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.send(200)
  })


module.exports = Route
