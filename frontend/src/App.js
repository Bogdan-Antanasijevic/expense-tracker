import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Loader from './components/loader/loader';
import AuthPage from './pages/Auth/AuthPage'
import RegisterPage from './pages/Auth/RegisterPage';
import HomePage from './pages/HomePage/HomePage';


function App() {

  axios.defaults.baseURL = 'http://localhost:4000';

  return (
    // <Router>
      <div className="container wrapper">
        <Routes>        
          <Route path='/' element={<AuthPage />}/>          
          <Route path='/register' element={<RegisterPage />}/>          
          <Route path='/home' element={<HomePage />}/>          
        </Routes>        
      </div>
    // </Router>
  );
}

export default App;
