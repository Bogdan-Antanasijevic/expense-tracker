import React, { useState, useEffect } from 'react'
import './newTransaction.scss'
import { useDispatch, useSelector } from 'react-redux'
import TransactionService from '../../services/transactionService';
import { setNewTransaction } from '../../redux/transactionSlice'
import { showLoader } from '../../redux/loaderSlice'
import Loader from '../loader/loader';

function NewTransaction() {

  const [transaction, setTransaction] = useState({
    text: '',
    amount: ''
  })
  const [isFormValid, setIsFormValid] = useState(true);
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  function handleInputFields(e) {
    setTransaction((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }))
  }

  function createTransaction(e) {
    e.preventDefault();
    if (!transaction.text || !transaction.amount) {
      setIsFormValid(false)
      return
    }
    setIsFormValid(true)
    e.target[0].value = '';
    e.target[1].value = '';
    dispatch(showLoader(true))
    TransactionService.newTransaction({ transaction, user })
      .then((res) => {
        console.log(res.data);
        getTransactions();
      })
      .catch((err) => {
        console.log(err);
      })
    setTransaction('')
  }
  const transactions = useSelector(state => state.transactionStore)
  useEffect(() => {
    getTransactions();
  }, [transactions[0]])


  function getTransactions() {
    TransactionService.getTransactionsByUsername(user)
      .then(res => {
        if (res.status === 200) {
          dispatch(setNewTransaction(res.data))
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (

    <div className='container '>
      <Loader />
      <h4 className='transaction'>Add new transaction</h4>
      <form
        className='form-group'
        onSubmit={(e) => { createTransaction(e) }}>
        <label htmlFor="text">Text</label>
        <input type="text"
          id='text'
          name='text'
          placeholder='Enter text...'
          className='form-control'
          defaultValue={transaction.text}
          onChange={handleInputFields}
        />
        <label htmlFor="amount">
          Amount <br />
          (negative - expense, positive - income)
        </label>
        <input type="number"
          id='amount'
          name='amount'
          placeholder='Enter amount...'
          className='form-control'
          onChange={handleInputFields}
          defaultValue={transaction.amount}
        />
        <input type="submit"
          value="Add transaction"
          className='form-control btn btn-primary '
        />

        {!isFormValid && <p style={{ color: 'red' }}>* All fields are required</p>}
      </form>

    </div>
  )
}

export default NewTransaction