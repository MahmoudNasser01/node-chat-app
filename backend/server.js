const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config()
app.get('/', (req, res)=>{
    res.send('API is running')
})

app.get('/api/chat', (req, res)=>{
    res.send({text:'hello from express'})
})

app.get('/api/chat:id', (req, res)=>{
    res.send({text:'hello from express'})
})



app.listen(process.env.PORT || 5000, ()=>{
    console.log('server is running...')
})