import React, { useState } from 'react';
import { CreateTodoListsAPI } from '../../../api/todo/TodoListController.js';

const TodoCreateCard = () => {
  const [step, setStep] = useState(1); 
  const [todoItem, setTodoItem] = useState('');
  const [description, setDescription] = useState(''); 

  const handleInputChange = (event) => {
    setTodoItem(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setDescription(event.target.value);
  };

  const handleNext = () => {
      setStep(2); 
  };

  const handleForCreate= async () => {
    const payload = {
      "TodoItem": todoItem,
      "description": description
    }

    const response = await CreateTodoListsAPI(payload)

    if (response?.status === 200) {
      setTodoItem('')
      setDescription('')
      setStep(1); 
      window.location.reload();
    } else {
      console.log('Failed to create todo item.');
    }
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
        transition-all
        duration-500
      '
    >
      {step === 1 && (
        <div className="w-full flex flex-col items-center gap-5">
          <p>Enter your todo WishList</p>
          <input
            type="text"
            placeholder="Enter the todo item"
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
              ${!todoItem.trim() ? 'bg-gray-300' : 'bg-blue-500'}  
              text-white
              font-medium
              py-2
              px-6
              rounded-lg
              shadow-md
              hover:${!todoItem.trim() ? 'bg-gray-300' : 'bg-blue-600'}  
              hover:shadow-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-400
              focus:ring-offset-2
              transition-all
            `}
            onClick={handleNext}
            disabled={!todoItem.trim()}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="w-full flex flex-col items-center gap-5 animate-fadeIn">
          <p>Enter the descriptions</p>
          <input
            type="text"
            placeholder="Enter the description"
            value={description}
            onChange={handleInputChange2}
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
              bg-green-500
              text-white
              font-medium
              py-2
              px-6
              rounded-lg
              shadow-md
              hover: 'bg-green-600'
              hover:shadow-lg
              focus:outline-none
              focus:ring-2
              focus:ring-green-400
              focus:ring-offset-2
              transition-all
            `}
            onClick={handleForCreate}
    
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoCreateCard;
