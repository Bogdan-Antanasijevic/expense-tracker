import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ResetBalanceModal from './ResetBalanceModal';
import {showResetBalanceModal} from '../../redux/resetBalanceModal'
import './balance.scss'

function Balance() {

  const transactions = useSelector(state => state.transactionStore)
  const transactionsLastArray = transactions.length - 1;  
  const dispatch = useDispatch();
  const {showModal} = useSelector(state => state.resetBalanceModalStore);

  const arr = [];

  if (transactions[0]) {
    transactions[transactionsLastArray].map((el, i) => {
      arr.push(el.amounts);
    })
  }

  let balance;
  if (arr.length) {
    balance = arr.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    )

  }
  
  const resetBalance = () =>{    
      if(!showModal){
        dispatch(showResetBalanceModal(true))
      }
      else{
        dispatch(showResetBalanceModal(false))
      }
      
  }

  return (
    <>
      <div className="balance">
        {showModal ? <ResetBalanceModal /> : null}        
        <h4>YOUR BALANCE</h4>
        <button className='btn btn-info btn-sm' onClick={resetBalance}>Reset balance</button>        
      </div>      
      <h1 className='amount'>${balance || 0}</h1>
    </>

  )
}

export default Balance