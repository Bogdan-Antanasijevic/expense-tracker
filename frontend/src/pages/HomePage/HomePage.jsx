import React from 'react'
import Header from '../../components/Header/Header'
import Balance from '../../components/Balance/Balance'
import IncomeExpense from '../../components/IncomeExpense/IncomeExpense'
import TrackerList from '../../components/TrackerList/TrackerList.jsx'
import NewTransaction from '../../components/NewTransaction/NewTransaction'

function HomePage() {
  return (
    <>
      <Header/>
      <div className='container tracker-wrapper'>
        <Balance />      
        <IncomeExpense />   
        <TrackerList />
        <NewTransaction />
      </div>
    </>
  )
}

export default HomePage