import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showLoader } from '../../redux/loaderSlice';
import { setNewTransaction } from '../../redux/transactionSlice';
import AuthService from '../../services/authService'
import TransactionService from '../../services/transactionService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const inputEl = useRef();

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
    dispatch(showLoader(true))

    AuthService.login(formData)
      .then(res => {
        e.target[0].value = '';
        e.target[1].value = '';
        // console.log('PODACI', res.data);
        localStorage.setItem('user', JSON.stringify(res.data.username));
        localStorage.setItem('token', JSON.stringify(res.data.token));

        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(res.data.username);
        TransactionService.getTransactionsByUsername(user)
          .then(res => {
            if (res.status === 200) {
              dispatch(setNewTransaction(res.data))
              dispatch(showLoader(false))

            }
          })
          .catch(err => {
            console.log(err);


          })

        if (localStorage.hasOwnProperty('user')) {
          navigate('/home')
        }
        else {
          return
        }


      })
      .catch(err => {
        // console.log( err);
        dispatch(showLoader(false))
        toast.error(err.response.data)
      })
  }
  const showHidePass = (e) => {
    if (!isPasswordVisible) {
      setIsPasswordVisible(true)
      inputEl.current.type='password';
    }
    else {
      setIsPasswordVisible(false);
      inputEl.current.type='text';
    }
  }


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className='auth-wrapper'>
      <Loader />
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

        <div className='form-control password-input'>
          <input
            type='password'
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={onChange}
            name='password'
            ref={inputEl}
          />
          <label htmlFor='checkbox' className='checkbox-label' > {!isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            <input type='checkbox' id='checkbox' className='checkbox' onClick = {showHidePass}/>
          </label>
        </div>        

        <input type='submit' className='form-control btn btn-dark' value='Login' />
        <input type='button' className='form-control btn btn-dark' onClick={goToRegisterForm} value='Register' />

        {!isFormValid && <p style={{ color: 'red' }}>*Username and password is required!</p>}
      </form>
      <ToastContainer />
    </div>
  )
}

export default AuthPage