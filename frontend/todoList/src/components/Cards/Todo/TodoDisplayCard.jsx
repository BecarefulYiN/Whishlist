import React from 'react';
import TodoCard from './TodoCard.jsx';

const TodoDisplayCard = ({ refreshTodoList }) => {
  return (
    <div
      className='
        w-1/2
        flex
        flex-col
        gap-10
        bg-blue-gray-50
        h-auto
        rounded-3xl
        px-12
        py-5
      '
    >
      <p
        className='
          w-full
          ml-9
          pl-4
          text-xl
          font-bold
        '
      >
        Wish Lists
      </p>
      <TodoCard refreshTodoList={refreshTodoList} />
    </div>
  );
};

export default TodoDisplayCard;
