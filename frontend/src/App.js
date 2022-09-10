import axios from 'axios';
import './App.css';
import AuthPage from './pages/AuthPage'


function App() {  
  
  axios.defaults.baseURL = 'http://localhost:4000';

  return (
    <div className="App">
      <AuthPage />       
    </div>
  );
}

export default App;
