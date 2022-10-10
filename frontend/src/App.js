import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar/NavBar';
import AuthPage from './pages/Auth/AuthPage'
import RegisterPage from './pages/Auth/RegisterPage';
import HomePage from './pages/HomePage/HomePage';


function App() {

  axios.defaults.baseURL = 'https://expense-tracker-production.up.railway.app';
  const [isCheckingUserFinished, setIsCheckingUserFinished] = useState(false);

  const navigate = useNavigate()
  const handleLoginUser = () => {
    if (!localStorage.hasOwnProperty('user')) {
      navigate('/')
    }
  }
  useEffect(() => {
    handleLoginUser();
  }, [])

  return (
    <>
    
      {localStorage.hasOwnProperty('user') ? <NavBar /> : null}

      <div className="container wrapper">
        <Routes>
          <Route path='/' element={<AuthPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </div>
    </>

  );
}

export default App;
