

const getActiveTodoListById = 'SELECT "ID", "TodoItem", "Complete", "IsActive", "userId", description FROM public."TodoList" WHERE "ID" = $1 AND "IsActive" = true ;';

const getTodoListById = 'SELECT "ID", "TodoItem", "Complete", "IsActive", "userId", description FROM public."TodoList" WHERE "ID" = $1;';

const createTodoList = 'INSERT INTO "TodoList" ("TodoItem","userId", description) VALUES ($1,$2, $3);'

const editTodoList = 'UPDATE "TodoList" SET "TodoItem"=$1 , description =$2 WHERE "ID"= $3;'

const deleteTodoList = 'UPDATE "TodoList" SET "IsActive"=false WHERE "ID"= $1;'

const getTodoListCount = 'SELECT COUNT(*) FROM "TodoList" WHERE "IsActive" = true AND "userId" = $1;'

const getAllTodoListPaginated= 'SELECT "ID", "TodoItem", "Complete", "IsActive","userId", description FROM "TodoList" WHERE "IsActive"=true AND "userId" = $1 ORDER BY "ID" DESC LIMIT $2 OFFSET $3;'

const getAllTodoListThatHaveBeenDelected = 'SELECT "ID", "TodoItem", "Complete", "IsActive","userId", description FROM "TodoList" WHERE "IsActive"=false AND "userId" = $1 ORDER BY "ID" DESC'

const restoreTheDeletedList = `UPDATE "TodoList" SET "IsActive"=true WHERE "ID"= $1;`

const getTotalTodoCount = 'SELECT COUNT(*) FROM "TodoList" WHERE "userId" = $1;'

const getCompleteTodoCount = 'SELECT COUNT(*) FROM "TodoList" WHERE "userId" = $1 AND "Complete" = true AND "IsActive" = true;'

const getIncompleteTodoCount = 'SELECT COUNT(*) FROM "TodoList" WHERE "userId" = $1 AND "Complete" = false AND "IsActive" = true;'

const getDeleteedTodoCount = 'SELECT COUNT(*) FROM "TodoList" WHERE "userId" = $1 AND "IsActive" = false;'

const updateToComnplete = `UPDATE "TodoList" SET "Complete"=$1 WHERE "ID"= $2;`

module.exports = {
  getActiveTodoListById,
  createTodoList,
  editTodoList,
  deleteTodoList,
  getTodoListById,
  getTodoListCount,
  getAllTodoListPaginated,
  getAllTodoListThatHaveBeenDelected,
  restoreTheDeletedList,
  getTotalTodoCount,
  getCompleteTodoCount,
  getIncompleteTodoCount,
  getDeleteedTodoCount,
  updateToComnplete
}