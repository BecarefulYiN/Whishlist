const express = require('express');
const app = express();
const todoRoute = require('./src/todo/todo.routes');
const cors = require('cors');
require('dotenv').config()


// Enable CORS for frontend running on localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: 'Content-Type',
}));

// Middleware to log incoming requests
app.use('/api/v1/todo', (req, res, next) => {
  console.log("Received request:", req.method, req.path);
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/api/v1/todo', todoRoute);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
