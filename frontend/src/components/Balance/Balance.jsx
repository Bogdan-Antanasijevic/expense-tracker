import React from 'react'
import {useSelector} from 'react-redux'
import './balance.scss'

function Balance() {

  const transactions = useSelector(state => state.transactionStore)
  const transactionsLastArray = transactions.length - 1;

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
  // console.log(balance);

  return (
    <>
      <h4>YOUR BALANCE</h4>
      <h1 className='amount'>${balance || 0}</h1>
    </>

  )
}

export default Balance