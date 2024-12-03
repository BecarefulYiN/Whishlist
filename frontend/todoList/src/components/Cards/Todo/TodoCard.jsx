import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DetailsIcon from '@mui/icons-material/Details';
import { DeleteTodoAPI, GetTodoListsAPI, UpdateCompleteState } from '../../../api/todo/TodoListController.js';
import EditDialog from '../../Dialog/Todo/EditDialog.jsx';
import Pagination from '../../Pagination/Pagination.jsx';
import './Todo.css'

const TodoCard = ({refreshTodoList }) => {
  const [todoLists, setTodoLists] = useState([]);
  const [expandedTodoIds, setExpandedTodoIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [deletingId, setDeletingId] = useState(null); // Track item being deleted

  useEffect(() => {
    const fetchTodoLists = async () => {
      const payload = { page, limit };
      await GetTodoListsAPI(payload, setTodoLists, setTotalRecords);
    };

    fetchTodoLists();
  }, [page, limit, refreshTodoList]);

  const handleDelete = async (id) => {
    setDeletingId(id); 
    setTimeout(async () => {
      try {
        const response = await DeleteTodoAPI(id);
        if (response?.status === 200) {
          
          setTotalRecords((prevTotal) => prevTotal - 1);
  
          
          const payload = { page, limit };
          await GetTodoListsAPI(payload, (updatedList) => {
            setTodoLists(updatedList);
          }, null);
  
          if (todoLists.length === 1 && page > 1) {
            setPage((prevPage) => prevPage - 1);
          }
        } else {
          console.error("Failed to delete todo");
        }
      } catch (error) {
        console.error("Error deleting todo:", error.message);
      } finally {
        setDeletingId(null); // Reset after deletion
      }
    }, 500); // Animation duration (matches CSS)
  };
  
  

  const handleEditDialogOpen = (todo, id) => {
    setSelectedTodo(todo);
    setSelectedId(id);
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedTodo(null);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const toggleDetails = (id) => {
    setExpandedTodoIds((prevIds) => {
      const updatedIds = new Set(prevIds);
      if (updatedIds.has(id)) {
        updatedIds.delete(id);
      } else {
        updatedIds.add(id);
      }
      return updatedIds;
    });
  };

  const handleCheckboxChange = async (todo) => {
    const updatedComplete = !todo.Complete;

    try {
      const payload = { Complete: updatedComplete };
      const response = await UpdateCompleteState(todo.ID, payload);

      if (response !== null) {
        setTodoLists((prevTodoLists) =>
          prevTodoLists.map((item) =>
            item.ID === todo.ID ? { ...item, Complete: updatedComplete } : item
          )
        );
      } else {
        console.error('Failed to update todo complete status');
      }
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center gap-6">
      {todoLists.length > 0 ? (
        todoLists.map((todo) => (
          <div
            key={todo.ID}
            className={`w-10/12 pt-2 rounded-3xl shadow-md px-10 overflow-hidden transition-all duration-300 ease-in-out ${
              expandedTodoIds.has(todo.ID) ? 'h-32' : 'h-14'
            } ${todo.Complete ? 'bg-green-200' : 'bg-white'} ${
              deletingId === todo.ID ? 'animate-delete' : ''
            }`}
          >
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-xl">{todo.TodoItem}</p>

              <div className="flex flex-row gap-6">
                <button
                  className="text-gray-500 hover:text-blue-500 hover:scale-110 transition-transform duration-200 focus:outline-none p-2 hover:bg-blue-gray-50 rounded-full"
                  aria-label="Detail"
                  onClick={() => toggleDetails(todo.ID)}
                >
                  <DetailsIcon />
                </button>

                <button
                  className="text-gray-500 hover:text-blue-500 hover:scale-110 transition-transform duration-200 focus:outline-none p-2 hover:bg-blue-gray-50 rounded-full"
                  aria-label="Edit"
                  onClick={() => handleEditDialogOpen(todo, todo.ID)}
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

                <div className="flex justify-end items-center">
                  <input
                    type="checkbox"
                    checked={todo.Complete}
                    onChange={() => handleCheckboxChange(todo)}
                    className="cursor-pointer w-4 h-4"
                  />
                </div>
              </div>
            </div>

            <div
              className={`transition-opacity duration-300 ${
                expandedTodoIds.has(todo.ID) ? 'opacity-100 mt-4' : 'opacity-0 h-0'
              }`}
            >
              <p className="text-gray-600 text-center">
                {todo.description || 'No description available.'}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-500 mt-4">No wish list found</p>
      )}

      <Pagination
        totalPages={Math.ceil(totalRecords / limit)}
        initialPage={page}
        onPageChange={handlePageChange}
      />

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

