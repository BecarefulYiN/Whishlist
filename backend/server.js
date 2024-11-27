const express = require('express')
const app = express()
const todoRoute = require('./src/todo/todo.routes')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//route
app.use('/api/v1/todo', todoRoute)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3001, () => {
  console.log("server is running in 3001")
})