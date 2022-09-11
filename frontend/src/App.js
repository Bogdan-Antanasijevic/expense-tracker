import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import AuthPage from './pages/Auth/AuthPage'
import RegisterPage from './pages/Auth/RegisterPage';


function App() {

  axios.defaults.baseURL = 'http://localhost:4000';

  return (
    <Router>
      <div className="container wrapper">
        <Routes>        
          <Route path='/' element={<AuthPage />}/>          
          <Route path='/api/register' element={<RegisterPage />}/>          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
