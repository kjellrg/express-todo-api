const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const loginRoute = require('./routes/todos')
const todosRoute = require('./routes/todos')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/todos', todosRoute)
app.use('/login', loginRoute)

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});