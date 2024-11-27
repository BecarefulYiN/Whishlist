const getAllTodoList = 'SELECT "ID", "TodoItem", "Complete", "IsActive" FROM public."TodoList" WHERE "IsActive"=true ORDER BY "ID" ASC ;';

const getActiveTodoListById = 'SELECT "ID", "TodoItem", "Complete", "IsActive" FROM public."TodoList" WHERE "ID" = $1 AND "IsActive" = true ;';

const getTodoListById = 'SELECT "ID", "TodoItem", "Complete", "IsActive" FROM public."TodoList" WHERE "ID" = $1;';

const createTodoList = 'INSERT INTO "TodoList" ("TodoItem") VALUES ($1);'

const editTodoList = 'UPDATE "TodoList" SET "TodoItem"=$1 WHERE "ID"= $2;'

const deleteTodoList = 'UPDATE "TodoList" SET "IsActive"=false WHERE "ID"= $1;'

const getTodoListCount = 'SELECT COUNT(*) FROM "TodoList" WHERE "IsActive" = true;'

const getAllTodoListPaginated= 'SELECT "ID", "TodoItem", "Complete", "IsActive" FROM public."TodoList" WHERE "IsActive"=true ORDER BY "ID" ASC LIMIT $1 OFFSET $2;'

module.exports = {
  getAllTodoList,
  getActiveTodoListById,
  createTodoList,
  editTodoList,
  deleteTodoList,
  getTodoListById,
  getTodoListCount,
  getAllTodoListPaginated
}