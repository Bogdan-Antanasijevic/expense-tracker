import React from 'react'
import './incomeExpense.scss'

function IncomeExpense() {
  return (
    <div className='income-expense'>
      <div className="income">
        <h4>INCOME</h4>
        <h2 className='income-amount'>$500</h2>
      </div>
      <div className="expense">
        <h4>EXPENSE</h4>
        <h2 className='expense-amount'>$200</h2>
      </div>

    </div>
  )
}

export default IncomeExpense