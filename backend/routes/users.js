const express = require('express');
const jwt = require('jsonwebtoken')
const { auth } = require('../helpers/routes_middelware')
const User = require('../models/UserModel')
const { getHash, compareHash } = require('../helpers/passwordhash')
require('dotenv').config()

const Route = express.Router()

//TODO document routes
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
  try {
    if (!req.body?.password || !req.body?.email)
      throw `need 'username' and 'password'`

    const user = await User.findOne({ email: req.body.email })

    if (user === null) throw `couldn't find user`

    if (!compareHash(req.body.password, user.password))
      return `incorrect user name or password`

    const token = jwt.sign({ ...user, password: '' }, process.env.TOKEN_SECRET)
    res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 })
    res.status(200)
    res.send({ text: 'auth user', token: token })
  } catch (err) {
    console.log('request body' + JSON.stringify(req.body))
    res.status(400)
    res.send({ error: err })
  }
})

  .post('/signup', async (req, res) => {
    try {
      if (!req.body?.username || !req.body?.password || !req.body?.email)
        throw `need 'username' and 'password'`
      const password = await getHash(req.body.password)
      const user = await User.create({
        name: req.body.username,
        email: req.body.email,
        password,
      })

      const token = jwt.sign(
        { ...user, password: '' },
        process.env.TOKEN_SECRET
      )

      res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 })

      res.status(200)
      res.send({ text: 'user sign up', token: token, user })
    } catch (err) {
      res.status(400)
      res.send({ error: err })
    }
  })
  .get('/logout', auth, async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.send(200)
  })


module.exports = Route
