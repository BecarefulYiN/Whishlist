import React, { useEffect, useState } from 'react';
import NavbarComponent from '../components/Navbar/NavbarComponent.jsx';
import { jwtDecode } from 'jwt-decode';
import { Box } from '@mui/material';
import DashboardChartData from '../components/Cards/dashboard/DashboardChartData.jsx';
import { GetTheTotalCountAPI } from '../api/todo/TodoListController.js';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [totalCount, setTotalCount] = useState(null); 
  const [complete, setComplete] = useState(null);
  const [incomplete, setIncomplete] = useState(null);
  const [deleted, setDeleted] = useState(null)

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.replace('/login');
      return;
    }
    const decoded = jwtDecode(token);
    setUserName(decoded.userName);
  }, []);

  useEffect(() => {
    const fatchData = async () => {
      await GetTheTotalCountAPI(setTotalCount,setComplete, setIncomplete,setDeleted);
    };
    fatchData();
  }, []);

  

  return (
    <>
      <div className="flex flex-col gap-10 w-screen items-center bg-gray-300 h-screen relative pt-14">
        <NavbarComponent />
        <Box className="mt-24 text-4xl w-1/2">
          {`Hi, ${userName}`}
        </Box>
        {totalCount !== null && totalCount !== undefined ? (
          <DashboardChartData totalCount={totalCount} complete={complete}  incomplete={incomplete} deleted={deleted}/>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
