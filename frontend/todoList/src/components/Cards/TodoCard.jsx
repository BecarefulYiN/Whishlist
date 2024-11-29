import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteTodoAPI, GetTodoListsAPI } from '../../api/todo/TodoListController.js';
import EditDialog from '../Dialog/Todo/EditDialog.jsx';

const TodoCard = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null); 
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    const fetchTodoLists = async () => {
      const payload = { page, limit };
      await GetTodoListsAPI(payload, setTodoLists, setTotalRecords);
    };

    fetchTodoLists();
  }, [page, limit]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteTodoAPI(id);
      if (response?.status === 200) {
        setTodoLists((prevTodoLists) => prevTodoLists.filter((todo) => todo.ID !== id));
      } else {
        console.log('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const handleEditDialogOpen = (todo,id) => {

    setSelectedTodo(todo); 
    setSelectedId(id)
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false); 
    setSelectedTodo(null); 
  };

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center gap-10">
      {todoLists.length > 0 ? (
        todoLists.map((todo) => (
          <div
            key={todo.ID}
            className="w-10/12 h-14 bg-white rounded-3xl shadow-md flex flex-row justify-between px-10 items-center"
          >
            <p className="text-xl">{todo.TodoItem}</p>

            <div className="flex flex-row gap-6">
              <button
                className="text-gray-500 hover:text-blue-500 hover:scale-110 transition-transform duration-200 focus:outline-none p-2 hover:bg-blue-gray-50 rounded-full"
                aria-label="Edit"
                onClick={() => handleEditDialogOpen(todo,todo.ID)} // Pass the todo data for editing
              >
                <EditIcon />
              </button>
              <button
                className="text-gray-500 hover:text-red-500 hover:scale-110 transition-transform duration-200 focus:outline-none p-2 hover:bg-blue-gray-50 rounded-full"
                aria-label="Delete"
                onClick={() => handleDelete(todo.ID)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-500 mt-4">No todos found</p>
      )}

      <EditDialog
        open={isEditDialogOpen}
        handleClose={handleCloseDialog} 
        selectedTodo={selectedTodo} 
        selectedId={selectedId}
      />
    </div>
  );
};

export default TodoCard;
