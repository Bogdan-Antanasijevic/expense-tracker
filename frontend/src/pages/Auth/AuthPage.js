import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import { showLoader } from '../../redux/loaderSlice';
import AuthService from '../../services/authService'
import './authPage.scss';


function AuthPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(showLoader(true))
    AuthService.login(formData)
      .then(res => {
        console.log('PODACI',res.data);
        localStorage.setItem('user', JSON.stringify(res.data.username));
        localStorage.setItem('token', JSON.stringify(res.data.token));
        if(localStorage.hasOwnProperty('user')){
          navigate('/home')
        }
        else{
          return
        }
        dispatch(showLoader(false))
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
      <Loader/>
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
        {!isFormValid && <p style={{color: 'red'}}>*Username and password is required!</p>}
      </form>
    </div>
  )
}

export default AuthPage