const express = require('express')
const router = express.Router();
const controller = require('./todo.controller')
const authenticateJWT = require('../middleware/JWTAuthentication.js');

//getAll
router.post('/filter',authenticateJWT, controller.getAllTodoLists)
router.get('/deleted-items', authenticateJWT, controller.getAllTodoListThatHaveBeenDelected)
router.get('/total', authenticateJWT, controller.getTotalCount)
//post
router.post('/', authenticateJWT,controller.createTodoList)

//delete 
router.patch("/:id",controller.deleteTodoList)

//update 
router.put("/:id", controller.UpdateTodoList)
router.put("/restore-delected/:id", controller.restoreTheDeletedList)
router.put("/set-complete/:id", controller.updateToComplete)


module.exports = router