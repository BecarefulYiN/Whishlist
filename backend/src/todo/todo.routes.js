const express = require('express')
const router = express.Router();
const controller = require('./todo.controller')


//getAll
router.post('/filter', controller.getAllTodoLists)

//post
router.post('/', controller.createTodoList)

//delete 
router.patch("/:id",controller.deleteTodoList)

//update 
router.put("/:id", controller.UpdateTodoList)

module.exports = router