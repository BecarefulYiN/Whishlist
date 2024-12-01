import React, {useEffect} from 'react'
import NavbarComponent from '../components/Navbar/NavbarComponent.jsx'
import { jwtDecode } from 'jwt-decode';


const Dashboard = () => {
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.replace('/login');
    }
    const decoded = jwtDecode(token)
    console.log(decoded)
  }, []);
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

      </div>
    </>
  )
}

export default Dashboard