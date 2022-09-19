import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../../services/authService';
import { showLoader } from '../../redux/loaderSlice'
import './registerPage.scss'
import Loader from '../../components/loader/loader';

function RegisterPage() {

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
  })
  const { username, password, email } = userData
  const [isFormValid, setIsFormValid] = useState(true);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  function backToLogin(e) {
    e.preventDefault()
    navigate('/')
  }

  const saveUserData = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  function saveNewUser(e) {
    e.preventDefault()

    if (!userData.username || !userData.password || !userData.email) {
      setIsFormValid(false)
      return
    }
    setIsFormValid(true)
    dispatch(showLoader(true))
    e.target[0].value = '';
    e.target[1].value = '';
    e.target[2].value = '';
    AuthService.register(userData)
      .then(res => {
        dispatch(showLoader(false))
        console.log('uspesno ste se registrovali'); // new component
        console.log(res);
      })
      .catch(err => {
        console.log('greska pri registrovanju', err);
      })

  }


  return (
    <div className='auth-wrapper'>     
    <Loader/>
      <h1>Register</h1>
      <form className='form-group' onSubmit={saveNewUser} >
        <label className='username-label' htmlFor='username'>Username</label>
        <input
          type='text'
          className='form-control'
          id='username'
          placeholder='Enter your username'
          value={username}
          onChange={saveUserData}
          name='username'
        />
        <label className='password-label' htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-control'
          id='password'
          placeholder='Enter your password'
          value={password}
          onChange={saveUserData}
          name='password' />
        <label className='email-label' htmlFor='email'>Email</label>
        <input
          type='email'
          className='form-control'
          id='email'
          placeholder='Enter your email'
          value={email}
          onChange={saveUserData}
          name='email'
        />
        <input type='submit' className='form-control btn btn-dark' value='Register' />
        <input type='button' className='form-control btn btn-dark' onClick={backToLogin} value='Back to login' />
      </form>
    </div>
  )
}

export default RegisterPage