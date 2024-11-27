const express = require('express')
const router = express.Router();
const controller = require('./todo.controller')


//getAll
router.get('/', controller.getAllTodoLists)

//post
router.post('/', controller.createTodoList)

//delete 
router.put("/:id",controller.deleteTodoList)

module.exports = router