import React from 'react'
import Header from '../../components/Header/Header'
import Balance from '../../components/Balance/Balance'
import IncomeExpense from '../../components/IncomeExpense/IncomeExpense'
import TrackerList from '../../components/TrackerList/TrackerList.jsx'
import NewTransaction from '../../components/NewTransaction/NewTransaction'
import './homePage.scss'

function HomePage() {
  return (
    <>      
      <div className='container tracker-wrapper'>
        <Header />
        <Balance />
        <IncomeExpense />
        <TrackerList />
        <NewTransaction />
      </div>
    </>
  )
}

export default HomePage