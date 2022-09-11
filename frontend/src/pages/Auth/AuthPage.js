import React from 'react';
import { useNavigate } from 'react-router-dom';
import './authPage.scss';


function AuthPage() {

  const navigate = useNavigate();


  function clickMe(e) {
    e.preventDefault()    
    navigate('/api/register')
  }

  return (
    <div className='auth-wrapper'>
      <h1>Welcome</h1>
      <form className='form-group'>
        <label className='username-label' htmlFor='username'>Username</label>
        <input type='text' className='form-control' id='username' placeholder='Enter your username'/>
        <label className='password-label' htmlFor='password'>Password</label>
        <input type='password' className='form-control' id='password' placeholder='Enter your password'/>
        <input type='button' className='form-control btn btn-dark'  value='Login' />        
        <input type='button' className='form-control btn btn-dark' onClick={clickMe} value='Register' />
      </form>
    </div>
  )
}

export default AuthPage