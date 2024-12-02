const express = require('express');
const app = express();
const todoRoute = require('./src/todo/todo.routes.js');
const authRoute = require('./src/auth/auth.routes.js');
const routes = require('./src/service/route.js');
const path = require('path');

const cors = require('cors');
require('dotenv').config();

// Enable CORS for frontend running on localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Middleware to log incoming requests for /api/v1/todo
app.use('/api/v1/todo', (req, res, next) => {
  console.log("Received request:", req.method, req.path);
  next();
});

const _dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define API routes before serving static files
app.use('/api/v1/todo', todoRoute);
app.use('/api/v1/auth', authRoute);
app.use(routes);

// Serve static files only in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/todoList/dist")));
  
  // Serve index.html for any unmatched routes in production
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "todoList", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
