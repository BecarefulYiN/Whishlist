import React, { useState, useEffect } from 'react'
import { GetDelectedTodoItemsAPI, RestoreDelectedTodoItemsAPI } from '../../../api/todo/TodoListController.js'
import RestoreIcon from '@mui/icons-material/Restore';
import CloseIcon from '@mui/icons-material/Close';

const RestoreSlidePage = ({ isSlidePageVisible, setIsSlidePageVisible }) => {

  const [delectedItems, setDelectedItems] = useState([])

  useEffect(() => {
    if (isSlidePageVisible) {
      const loadingData = async () => {
        await GetDelectedTodoItemsAPI(setDelectedItems)
      }
      loadingData()
    }
  }, [isSlidePageVisible]) 

  const handleRestore = async (id) => {
    try {
      await RestoreDelectedTodoItemsAPI(id);
      setDelectedItems((prevItems) =>
        prevItems.filter((todo) => todo.ID !== id)
      );
    } catch (error) {
      console.error("Error restoring todo item:", error);
    }
  };


  console.log(delectedItems)
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 ${isSlidePageVisible ? 'translate-x-0' : 'translate-x-full overflow-scroll'
        }`}
    >
      <div className="p-4 w-full flex justify-end">
        <button
          className="hover:text-red-500 font-bold mb-4"
          onClick={() => setIsSlidePageVisible(!isSlidePageVisible)}
        >
          <CloseIcon />
        </button>

      </div>
      <h2 className="text-xl font-bold mb-4 ml-4">Deleted lists</h2>
      <div
        className='
          w-full
          flex
          justify-center
          flex-col
          items-center
          gap-10
        '
      >
        {delectedItems.length > 0 ? (
          delectedItems.map((todo) => (
            <div
              key={todo.ID}
              className="w-10/12 h-14 bg-red-500 rounded-2xl shadow-md flex flex-row justify-between px-10 items-center"
            >
              <p className="text-xl">{todo.TodoItem}</p>

              <div className="flex flex-row gap-6">
                <button
                  className="text-gray-500 hover:text-blue-500 hover:scale-90 transition-transform duration-200 focus:outline-none p-2 hover:bg-gray-50 rounded-full"
                  aria-label="Edit"
                  onClick={() => handleRestore(todo.ID)}
                >
                  <RestoreIcon />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500 mt-4">No delected  items found</p>
        )}
      </div>

    </div>
  )
}

export default RestoreSlidePage