import React from 'react'
import TodoCreateCard from '../components/Cards/TodoCreateCard.jsx'
import TodoDisplayCard from '../components/Cards/TodoDisplayCard.jsx'

export const HomePage = () => {
  return (
    <div 
      className='
      flex 
      flex-col 
      gap-10
      w-screen 
      items-center
      bg-gray-300 
      h-screen 
      '
    >
      <TodoCreateCard/>
      <TodoDisplayCard/>
    </div>
  )
}
