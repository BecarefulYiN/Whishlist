const pool = require('../../db.js')
const queries = require('./todo.queries.js')

const getAllTodoLists = async(req,res) => {
  try{
    const result = await pool.query(queries.getAllTodoList)
  
    if (result.rows.length === 0) {
      return res.status(404).json({ Message: "No list found" });
  }
  res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({Message: error.message})
  }
}

const createTodoList = async(req,res) => {
  const {TodoItem} = req.body;
  try{
    if (!TodoItem) {
      return res.status(404).json({ Message: "Todo Item need to fill" });
    }
    await pool.query(queries.createTodoList, [TodoItem])
    res.status(200).json({message:"create successfully"})

  } catch (error) {
    res.status(500).json({Message: error.message})
  }
}

const deleteTodoList = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the todo list exists
    const isExist = await pool.query(queries.getTodoListById, [id]);
    if (isExist.rows.length === 0) {
      return res.status(404).json({ Message: "This todo list does not exist" });
    }

    // Check if the todo list is already deleted
    const isActiveOrNot = await pool.query(queries.getActiveTodoListById, [id]);
    if (isActiveOrNot.rows.length === 0) {
      return res.status(400).json({ Message: "This todo list is already deleted" });
    }

    // Delete the todo list
    await pool.query(queries.deleteTodoList, [id]);

    res.status(200).json({ Message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo list:", error); // Log the error for debugging
    res.status(500).json({ Error: "An internal server error occurred" });
  }
};

const UpdateTodoList = async (req,res) => {
  const {id} = req.params
  const {TodoItem} = req.body
  try {

    if (!TodoItem) {
      return res.status(404).json({ Message: "TodoItem need to fill" });
    }
    // Check if the todo list exists
    const isExist = await pool.query(queries.getTodoListById, [id]);
    if (isExist.rows.length === 0) {
      return res.status(404).json({ Message: "This todo list does not exist" });
    }

    // Check if the todo list is already deleted
    const isActiveOrNot = await pool.query(queries.getActiveTodoListById, [id]);
    if (isActiveOrNot.rows.length === 0) {
      return res.status(400).json({ Message: "This todo list is already deleted" });
    }

    await pool.query(queries.editTodoList, [TodoItem,id])

    res.status(200).json({ Message: "Update successfully" });
  } catch (error) {
    res.status(500).json({Message: error.message})
  }
};

module.exports = {
  getAllTodoLists,
  createTodoList,
  deleteTodoList,
  UpdateTodoList
}