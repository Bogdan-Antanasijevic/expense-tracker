import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../loader/loader'
import { showLoader } from '../../redux/loaderSlice'
import './trackerList.scss'

function TrackerList() {

    const transactions = useSelector(state => state.transactionStore)        
    const transactionsLastArray = transactions.length - 1;    
    const dispatch = useDispatch();
    const scrollDiv = useRef();
    useEffect(() => {
        scrollDiv.current?.scrollIntoView({ behavior: 'smooth' });
        dispatch(showLoader(false))
    }, [transactions]);

    return (
        
        <div className="tracker-list">
            <Loader />
            <h4 className='history'>History</h4>
            <div className='tracker-list-container'>
                {transactions[0] ? transactions[transactionsLastArray].map((el, index) => {
                    return <div className="tracker-list-items" key={index}>
                        <li className={transactions[transactionsLastArray][index].amounts >= 0 ? 'tracker-list-item-income' : 'tracker-list-item-expense'}>{transactions[transactionsLastArray][index].text}<span className='tracker-list-item-amount'>${transactions[transactionsLastArray][index].amounts}</span></li>
                    </div>
                }) : null}

                <div ref={scrollDiv} ></div>
            </div>

        </div>
    )
}

export default TrackerList