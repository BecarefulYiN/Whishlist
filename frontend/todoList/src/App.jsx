import './App.css'
import { HomePage } from './pages/HomePage.jsx'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import Register from './pages/Register.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<Register/>}/>
          
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>

  )
}

export default App
