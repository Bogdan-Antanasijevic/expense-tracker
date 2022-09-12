import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService'
import './authPage.scss';


function AuthPage() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const { username, password } = formData;
  const [isFormValid, setIsFormValid] = useState(true);

  function goToRegisterForm(e) {
    e.preventDefault()
    navigate('/register')
  }

  const login = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setIsFormValid(false)
      return
    }
    setIsFormValid(true);
    e.target[0].value = '';
    e.target[1].value = '';
    AuthService.login(formData)
      .then(res => {
        console.log('PODACI',res.data);
        navigate('/home')
      })
      .catch(err => {
        console.log('GRESKAA',err);
      })
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  }

  return (
    <div className='auth-wrapper'>
      <h1>Welcome</h1>
      <form className='form-group' onSubmit={login}>
        <label className='username-label' htmlFor='username'>Username</label>
        <input
          type='text'
          className='form-control'
          id='username'
          placeholder='Enter your username'
          value={username}
          onChange={onChange}
          name='username'
        />
        <label className='password-label' htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-control'
          id='password'
          placeholder='Enter your password'
          value={password}
          onChange={onChange}
          name='password' />
        <input type='submit' className='form-control btn btn-dark' value='Login' />
        <input type='button' className='form-control btn btn-dark' onClick={goToRegisterForm} value='Register' />
      </form>
    </div>
  )
}

export default AuthPage