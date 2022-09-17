import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css';
import AuthPage from './pages/Auth/AuthPage'
import RegisterPage from './pages/Auth/RegisterPage';
import HomePage from './pages/HomePage/HomePage';


function App() {

  axios.defaults.baseURL = 'http://localhost:4000';
  const [isCheckingUserFinished, setIsCheckingUserFinished] = useState(false);

  const navigate = useNavigate()
  const handleLoginUser = ()=>{
    if(!localStorage.hasOwnProperty('user')){
      navigate('/')
    }
    // else{
    //   navigate('/home')
    // }
  }
  useEffect(()=>{
    handleLoginUser();
  },[])

  return (
      <div className="container wrapper">
        <Routes>        
          <Route path='/' element={<AuthPage />}/>          
          <Route path='/register' element={<RegisterPage />}/>          
          <Route path='/home' element={<HomePage />}/>          
        </Routes>        
      </div>
  );
}

export default App;
