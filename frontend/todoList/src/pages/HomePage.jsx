import React, { useState, useEffect } from 'react';
import TodoCreateCard from '../components/Cards/Todo/TodoCreateCard.jsx';
import TodoDisplayCard from '../components/Cards/Todo/TodoDisplayCard.jsx';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import RestoreSlidePage from '../components/SlidePage/Todo/RestoreSlidePage.jsx';
import NavbarComponent from '../components/Navbar/NavbarComponent.jsx';



export const HomePage = () => {
  const [isSlidePageVisible, setIsSlidePageVisible] = useState(false);


  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.replace('/login');
    }

   
  }, []);

  const toggleSlidePage = () => {
    
    setIsSlidePageVisible(!isSlidePageVisible);
  };

  return (
    <>
      <div
        className='
      flex 
      flex-col 
      gap-10
      w-screen 
      items-center
      bg-gray-300 
      h-screen 
      relative
      pt-14
      '
      >
        <NavbarComponent/>
        <TodoCreateCard />
        <TodoDisplayCard />

        <button
          className='
          absolute
          right-1/3
          hover:bg-blue-gray-100
          p-3
          rounded-full
          hover:text-green-700
        '
          style={{
            top: "327px "
          }}
          onClick={toggleSlidePage}
        >
          <RestoreFromTrashIcon />
        </button>

        <RestoreSlidePage
          isSlidePageVisible={isSlidePageVisible}
          setIsSlidePageVisible={setIsSlidePageVisible}
        />

      </div>
    </>

  );
};
