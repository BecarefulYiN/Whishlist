const pool = require('../../db.js');
const queries = require('./todo.queries.js');
const {
  validateTodoItem,
  checkIfTodoListExists,
  checkIfTodoListIsActive
} = require('./todo.validator.js');

const getAllTodoLists = async (req, res) => {
  try {
    const userId = req.user.userId;
    // Extract page and limit from the request body with default values
    const page = parseInt(req.body.page) || 1; // Default to page 1
    const limit = parseInt(req.body.limit) || 10; // Default to 10 items per page

    // Calculate the offset
    const offset = (page - 1) * limit;

    // Query the database with pagination
    const result = await pool.query(queries.getAllTodoListPaginated, [userId,limit, offset]);

    if (result.rows.length === 0) {
      return res.status(404).json({ Message: "No list found" });
    }

    // Get the total count of todo items (for pagination metadata)
    const countResult = await pool.query(queries.getTodoListCount,[userId]);
    const totalItems = parseInt(countResult.rows[0].count);

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    // Send paginated response
    res.status(200).json({
      Data: result.rows,
      PageSetting: {
        currentPage: page,
        totalPages,
        totalItems,
      }
    });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

const createTodoList = async (req, res) => {
  const { TodoItem } = req.body;
  const userId = req.user.userId;

  const validation = validateTodoItem(TodoItem);
  if (!validation.valid) {
    return res.status(404).json({ Message: validation.message });
  }

  try {
    await pool.query(queries.createTodoList, [TodoItem,userId]);
    res.status(200).json({ message: "Created successfully" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

const deleteTodoList = async (req, res) => {
  const { id } = req.params;

  try {
    const validation = await checkIfTodoListExists(id);
    if (!validation.valid) {
      return res.status(404).json({ Message: validation.message });
    }

    const activeValidation = await checkIfTodoListIsActive(id);
    if (!activeValidation.valid) {
      return res.status(400).json({ Message: activeValidation.message });
    }

    await pool.query(queries.deleteTodoList, [id]);
    res.status(200).json({ Message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo list:", error);
    res.status(500).json({ Error: "An internal server error occurred" });
  }
};

const UpdateTodoList = async (req, res) => {
  const { id } = req.params;
  const { TodoItem } = req.body;

  const validation = validateTodoItem(TodoItem);
  if (!validation.valid) {
    return res.status(404).json({ Message: validation.message });
  }

  try {
    const existsValidation = await checkIfTodoListExists(id);
    if (!existsValidation.valid) {
      return res.status(404).json({ Message: existsValidation.message });
    }

    const activeValidation = await checkIfTodoListIsActive(id);
    if (!activeValidation.valid) {
      return res.status(400).json({ Message: activeValidation.message });
    }

    await pool.query(queries.editTodoList, [TodoItem, id]);
    res.status(200).json({ Message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

module.exports = {
  getAllTodoLists,
  createTodoList,
  deleteTodoList,
  UpdateTodoList
};
