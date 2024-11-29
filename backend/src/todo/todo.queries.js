

const getActiveTodoListById = 'SELECT "ID", "TodoItem", "Complete", "IsActive", "userId" FROM public."TodoList" WHERE "ID" = $1 AND "IsActive" = true ;';

const getTodoListById = 'SELECT "ID", "TodoItem", "Complete", "IsActive", "userId" FROM public."TodoList" WHERE "ID" = $1;';

const createTodoList = 'INSERT INTO "TodoList" ("TodoItem","userId") VALUES ($1,$2);'

const editTodoList = 'UPDATE "TodoList" SET "TodoItem"=$1 WHERE "ID"= $2;'

const deleteTodoList = 'UPDATE "TodoList" SET "IsActive"=false WHERE "ID"= $1;'

const getTodoListCount = 'SELECT COUNT(*) FROM "TodoList" WHERE "IsActive" = true AND "userId" = $1;'

const getAllTodoListPaginated= 'SELECT "ID", "TodoItem", "Complete", "IsActive","userId" FROM "TodoList" WHERE "IsActive"=true AND "userId" = $1 ORDER BY "ID" DESC LIMIT $2 OFFSET $3;'

const getAllTodoListThatHaveBeenDelected = 'SELECT "ID", "TodoItem", "Complete", "IsActive","userId" FROM "TodoList" WHERE "IsActive"=false AND "userId" = $1 ORDER BY "ID" DESC'

const restoreTheDeletedList = `UPDATE "TodoList" SET "IsActive"=true WHERE "ID"= $1;`

module.exports = {
  getActiveTodoListById,
  createTodoList,
  editTodoList,
  deleteTodoList,
  getTodoListById,
  getTodoListCount,
  getAllTodoListPaginated,
  getAllTodoListThatHaveBeenDelected,
  restoreTheDeletedList
}