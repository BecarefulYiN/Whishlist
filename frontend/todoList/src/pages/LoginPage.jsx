import React from 'react'
import LoginForm from '../components/Cards/Login/LoginForm.jsx'


const LoginPage = () => {
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
      justify-center
      
      '
    >
      <LoginForm/>
    </div>
  )
}

export default LoginPage