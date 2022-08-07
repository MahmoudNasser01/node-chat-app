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

Route.post('/login', async (req, res, next) => {
  try {
    if (!req.body?.password || !req.body?.email) {
      const err = new Error(`need 'username' and 'password'`)
      err.status = 400
      return next(err)
    }

    const user = (await User.findOne({ email: req.body.email })).toObject()

    if (user === null) {
        const err = new Error(`incorrect username or password`)
        err.status = 400
        return next(err)
    }

    if (!compareHash(req.body.password, user.password)) {
        const err = new Error(`incorrect username or password`)
        err.status = 400
        return next(err)
    }

    const token = jwt.sign({ ...user, password: '' }, process.env.TOKEN_SECRET)
    res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 })
    res.status(200)
    res.send({ user: { ...user, password: null ,token} })
  } catch (err) {
    next(err)
  }
})

  .post('/signup', async (req, res, next) => {
    try {
      if (!req.body?.username || !req.body?.password || !req.body?.email) {
        const err = new Error(
          `need username,password and email to create new user`
        )
        err.status = 400
        return next(err)
      }
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
      next(err)
    }
  })
  .get('/logout', auth, async (req, res, next) => {
    try {
      res.cookie('jwt', '', { maxAge: 1 })
      res.send(200)
    } catch (err) {
      next(err)
    }
  })


module.exports = Route
