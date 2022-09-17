import React, { useState } from 'react'
import './newTransaction.scss'
import { setNewTransaction } from '../../redux/transactionSlice';
import { useDispatch, useSelector } from 'react-redux'

function NewTransaction() {

  const dispatch = useDispatch();

  const [transaction, setNewTransaction] = useState({
    text: '',
    amount: ''
  })

  function handleInputFields(e) {
    setNewTransaction((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }))
  }

  function createTransaction(e) {
    e.preventDefault();
    console.log(transaction);
    e.target[0].value = ''
    e.target[1].value = ''
    console.log(transaction);
    dispatch(setNewTransaction(transaction))
  }


  return (

    <div className='container '>

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
          value={transaction.text}
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
          value={transaction.amount}
        />
        <input type="submit"
          value="Add transaction"
          className='form-control btn btn-primary '
        />

      </form>

    </div>
  )
}

export default NewTransaction