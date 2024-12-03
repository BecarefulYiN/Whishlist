import React, { useState, useEffect } from 'react';
import TodoCreateCard from '../components/Cards/Todo/TodoCreateCard.jsx';
import TodoDisplayCard from '../components/Cards/Todo/TodoDisplayCard.jsx';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import RestoreSlidePage from '../components/SlidePage/Todo/RestoreSlidePage.jsx';
import NavbarComponent from '../components/Navbar/NavbarComponent.jsx';

export const HomePage = () => {
  const [isSlidePageVisible, setIsSlidePageVisible] = useState(false);
  const [refreshTodoList, setRefreshTodoList] = useState(false); // State to trigger re-fetch

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.replace('/login');
    }
  }, []);

  const toggleSlidePage = () => {
    setIsSlidePageVisible(!isSlidePageVisible);
  };

  const handleRestore = () => {
    setRefreshTodoList((prevState) => !prevState); // Toggle state to trigger refresh
  };

  return (
    <div
      className='
        flex 
        flex-col 
        items-center 
        gap-10 
        justify-center
        content-center
        bg-gray-300 
        min-h-screen 
        pt-14 
        relative
      '
    >
      {/* Navbar */}
      <NavbarComponent />


    
        <TodoCreateCard />
  

    
        <TodoDisplayCard refreshTodoList={refreshTodoList} />
  

    
      <button
        className='
          fixed 
          bottom-10 
          right-10 
          bg-white 
          p-4 
          rounded-full 
          shadow-lg 
          hover:bg-gray-100 
          transition 
          duration-300 
          ease-in-out
        '
        onClick={toggleSlidePage}
        aria-label="Show Deleted Items"
      >
        <RestoreFromTrashIcon className="text-gray-600 hover:text-green-700" fontSize="large" />
      </button>

    
      <RestoreSlidePage
        isSlidePageVisible={isSlidePageVisible}
        setIsSlidePageVisible={setIsSlidePageVisible}
        onRestore={handleRestore} 
      />
    </div>
  );
};
