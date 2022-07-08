const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const loginRoute = require('./routes/api/v1/login')
const todosRoute = require('./routes/api/v1/todos')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/todos', todosRoute)
app.use('/api/v1/login', loginRoute)

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});