const express = require('express')
const router = express.Router();
const controller = require('./todo.controller')
const authenticateJWT = require('../middleware/JWTAuthentication.js');

//getAll
router.post('/filter',authenticateJWT, controller.getAllTodoLists)

//post
router.post('/', authenticateJWT,controller.createTodoList)

//delete 
router.patch("/:id",authenticateJWT,controller.deleteTodoList)

//update 
router.put("/:id",authenticateJWT, controller.UpdateTodoList)

module.exports = router