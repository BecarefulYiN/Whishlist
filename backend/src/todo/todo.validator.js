const pool = require('../../db.js');
const queries = require('./todo.queries.js');

const validateTodoItem = (todoItem) => {
  if (!todoItem) {
    return { valid: false, message: "Todo Item is required" };
  }
  return { valid: true };
};

const checkIfTodoListExists = async (id) => {
  const isExist = await pool.query(queries.getTodoListById, [id]);
  if (isExist.rows.length === 0) {
    return { valid: false, message: "This todo list does not exist" };
  }
  return { valid: true };
};

const checkIfTodoListIsActive = async (id) => {
  const isActiveOrNot = await pool.query(queries.getActiveTodoListById, [id]);
  if (isActiveOrNot.rows.length === 0) {
    return { valid: false, message: "This todo list is already deleted" };
  }
  return { valid: true };
};

module.exports = {
  validateTodoItem,
  checkIfTodoListExists,
  checkIfTodoListIsActive
};
