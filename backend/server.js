const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const UserRoute = require('./routes/users')
const ApiRoute = require('./routes/apis')
const configSwagger = require('./swagger')
const mongoose = require('mongoose')


const app = express()
dotenv.config()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

app.use(morgan('dev'))

app.use('/user', UserRoute)

app.use('/api', ApiRoute)

//  catch 404 and forward to error handler
app.use((req, res, next) => {
  next({status:404,message:'page not found'});
});

//  error handler
app.use((err, req, res, next) => {
  //  render the error page
  res.status(err.status || 500);
  res.send({error:err.message});
});

app.listen(port, () => {
  mongoose.connect(process.env.MONGO_DB_URL).then((v) => {
    console.log('connected to DB')
  })
  configSwagger(app, port)
})
