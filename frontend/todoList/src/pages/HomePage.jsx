import React,{useEffect} from 'react'
import TodoCreateCard from '../components/Cards/TodoCreateCard.jsx'
import TodoDisplayCard from '../components/Cards/TodoDisplayCard.jsx'

export const HomePage = () => {

  useEffect(() => {
    const token = sessionStorage.getItem('token');  
    if (!token) {
      window.location.replace('/login');  
    }
  }, []);

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
