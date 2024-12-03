import React, { useState, useEffect } from 'react';
import { GetDelectedTodoItemsAPI, RestoreDelectedTodoItemsAPI } from '../../../api/todo/TodoListController.js';
import RestoreIcon from '@mui/icons-material/Restore';
import CloseIcon from '@mui/icons-material/Close';

const RestoreSlidePage = ({ isSlidePageVisible, setIsSlidePageVisible, onRestore }) => {
  const [deletedItems, setDeletedItems] = useState([]);

  useEffect(() => {
    if (isSlidePageVisible) {
      const loadDeletedItems = async () => {
        try {
          await GetDelectedTodoItemsAPI(setDeletedItems);
        } catch (error) {
          console.error("Error fetching deleted items:", error);
        }
      };
      loadDeletedItems();
    }
  }, [isSlidePageVisible]);

  
  const handleRestore = async (id) => {
    try {
      await RestoreDelectedTodoItemsAPI(id);
      setDeletedItems((prevItems) => prevItems.filter((todo) => todo.ID !== id));
      onRestore(); 
    } catch (error) {
      console.error("Error restoring todo item:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 mt-16 h-full w-80 bg-white shadow-lg transition-transform duration-300 ${
        isSlidePageVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Close Button */}
      <div className="p-4 w-full flex justify-end">
        <button
          className="hover:text-red-500 font-bold mb-4"
          onClick={() => setIsSlidePageVisible(false)}
        >
          <CloseIcon />
        </button>
      </div>


      <h2 className="text-xl font-bold mb-4 ml-4">Deleted Lists</h2>

  
      <div
        className="w-full flex flex-col items-center gap-4 px-4"
        style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}
      >
        {deletedItems.length > 0 ? (
          deletedItems.map((todo) => (
            <div
              key={todo.ID}
              className="w-full max-w-xs bg-red-100 p-4 rounded-xl shadow-md flex justify-between items-center"
            >
              <p className="text-sm font-medium text-gray-800">{todo.TodoItem}</p>
              <button
                className="text-gray-500 hover:text-blue-500 hover:scale-105 transition-transform duration-200 focus:outline-none p-2 hover:bg-gray-200 rounded-full"
                aria-label="Restore"
                onClick={() => handleRestore(todo.ID)}
              >
                <RestoreIcon />
              </button>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500 mt-4">No deleted items found</p>
        )}
      </div>
    </div>
  );
};

export default RestoreSlidePage;
