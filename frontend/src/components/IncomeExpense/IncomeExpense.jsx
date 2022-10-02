import React from 'react'
import {useSelector} from 'react-redux'
import './incomeExpense.scss'

function IncomeExpense() {

  const transactions = useSelector(state => state.transactionStore)
  const transactionsLastArray = transactions.length - 1;

  const arr = [];

    if (transactions[0]) {
      transactions[transactionsLastArray].map((el, i) => {
        arr.push(el.amounts);
      })
    }
    
    let incomeArray = arr.filter(number => number > 0);
    let expenseArray = arr.filter(number => number < 0);

    let income;
    if (incomeArray.length) {
       income = incomeArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue
      )
    }

    let expense;
    if (expenseArray.length) {
       expense = expenseArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue
      )
    }    

  return (
    <div className='income-expense'>
      <div className="income">
        <h4>INCOME</h4>
        <h2 className='income-amount'>${income}</h2>
      </div>
      <div className="expense">
        <h4>EXPENSE</h4>
        <h2 className='expense-amount'>${expense}</h2>
      </div>

    </div>
  )
}

export default IncomeExpense