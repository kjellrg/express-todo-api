require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

// node listen port
var port = 3000

// mongoDB server
var MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER}`
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true}).catch(error => console.error(error))

var corsOptions = {
    origin: process.env.ORIGINS,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// middleware
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
const loginRoute = require('./routes/api/v1/login')
const todosRoute = require('./routes/api/v1/todos')
app.use('/api/v1/todos', todosRoute)
app.use('/api/v1/login', loginRoute)

// listen
app.listen(port, () => {
  console.log(`Listening on ${port}`)
});
