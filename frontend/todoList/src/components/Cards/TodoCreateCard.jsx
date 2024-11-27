import React, { useState } from 'react'
import { CreateTodoListsAPI } from '../../api/TodoListController.js'

const TodoCreateCard = () => {

  const [todoItem, setTodoItem] = useState('')


  const handleInputChange = (event) => {
    setTodoItem(event.target.value)
  }

  const handleForCreate = async () => {
    if (!todoItem.trim()) return;  // Prevent if input is empty
    
    const payload = {
      "TodoItem": todoItem
    }
    
    const response = await CreateTodoListsAPI(payload)

    if (response?.status === 200) {
      window.location.reload()
    } else {

      console.log('Failed to create todo item.')
    }

    setTodoItem('')  
  }

  return (
    <div
      className='
        w-1/2 
        bg-blue-gray-50
        h-1/4
        mt-10
        rounded-3xl
        flex
        flex-col
        items-center
        justify-center
        gap-8
      '
    >
      <input
        type="text"
        placeholder="Enter the todo list"
        value={todoItem}
        onChange={handleInputChange}
        className="
          w-1/2
          h-12
          border
          border-gray-300
          rounded-lg
          px-4
          py-2
          text-base
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          shadow-sm
          transition-all
        "
      />
      <button
        className={`
    ${!todoItem.trim() ? 'bg-gray-300' : 'bg-green-500'}  
    text-white
    font-medium
    py-2
    px-6
    rounded-lg
    shadow-md
    hover:${!todoItem.trim() ? 'bg-gray-300' : 'bg-green-600'}  
    hover:shadow-lg
    focus:outline-none
    focus:ring-2
    focus:ring-green-400
    focus:ring-offset-2
    transition-all
  `}
        onClick={handleForCreate}
        disabled={!todoItem.trim()}
      >
        Add
      </button>

    </div>
  )
}

export default TodoCreateCard
