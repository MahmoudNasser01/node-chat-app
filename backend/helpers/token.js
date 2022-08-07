const jwt = require('jsonwebtoken')
require('dotenv').config()

const getToken = (data) => {
    const token = jwt.sign({ ...data }, process.env.TOKEN_SECRET)
    return token
}

const decodeToken = (token) => {
    const data = jwt.verify(token, process.env.TOKEN_SECRET)
    return data
}

module.exports = { getToken, decodeToken }
