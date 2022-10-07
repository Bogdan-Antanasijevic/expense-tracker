import React from 'react'
import './resetBalanceModal.scss'
import { FaTimesCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { showResetBalanceModal } from '../../redux/resetBalanceModal'
import TransactionService from '../../services/transactionService'
import { setNewTransaction } from '../../redux/transactionSlice'

function ResetBalanceModal() {

  const dispatch = useDispatch();

  const cancelModal = () => {
    dispatch(showResetBalanceModal(false))
  }
  const user = JSON.parse(localStorage.getItem('user'));

  const resetBalance = () => {
    TransactionService.resetBalance(user)
      .then(res => {
        TransactionService.getTransactionsByUsername(user)
          .then(res => {
            // console.log(res);
            dispatch(setNewTransaction(res.data))
          })
          .catch(err => {
            console.log(err);
          })
        dispatch(showResetBalanceModal(false));
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className='reset-balance-modal'>
      <FaTimesCircle className='times-circle-icon' />
      <h2>Are u sure?</h2>
      <p>Do you really want to reset your balance? This process cannot be undone</p>
      <div className='buttons-div container'>
        <button className='btn btn-success rbm-button' onClick={resetBalance}>Yes</button>
        <button className='btn btn-secondary rbm-button' onClick={cancelModal}>Cancel</button>
      </div>
    </div>
  )
}

export default ResetBalanceModal