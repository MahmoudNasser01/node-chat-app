/**
 * this for request middleware per route
 * as verify user token
 */
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    if (!process.env.TOKEN_SECRET) {
      console.error(`can't get token secret from environmental variable`)
    }
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw Error('token required')
    jwt.verify(token, process.env.TOKEN_SECRET)

    req.token = token;
    next()
  } catch (error) {
    res.status(403)
    res.contentType('application/json')
    res.send({ error: 'invalid token JWT must be provided' })
  }
}
module.exports = { auth }