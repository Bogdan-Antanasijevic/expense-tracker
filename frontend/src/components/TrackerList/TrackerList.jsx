import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import './trackerList.scss'

function TrackerList() {
    
    const transaction = useSelector(state => state.transactionStore)    

    const scrollDiv = useRef();
    useEffect(() => {
        scrollDiv.current?.scrollIntoView({ behavior: 'smooth' });
    }, [transaction]);

    return (
        <div className="tracker-list">
            <h4 className='history'>History</h4>
            <div className='tracker-list-container'>
                {transaction.map((el, index) => {                    
                    return <div className="tracker-list-items" key={index}>
                        <li className={transaction[index].amount >= 0 ? 'tracker-list-item-income' : 'tracker-list-item-expense'}>{transaction[index].text}<span className='tracker-list-item-amount'>${transaction[index].amount}</span></li>
                    </div>                
            })}
                <div ref={scrollDiv} ></div>
            </div>

        </div>
    )
}

export default TrackerList