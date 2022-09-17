import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './trackerList.scss'
import transactionStore from '../../redux/store'

function TrackerList() {
    
    const transaction = useSelector(state=>state.transactionStore)
    useEffect(()=>{
        console.log(transaction);
    },[transaction])
        
    return (
        <div className="tracker-list">
            <h4 className='history'>History</h4>



            {/* <div className="tracker-list-items">
                <li className='tracker-list-item-expense'>Cash<span className='tracker-list-item-amount'>$500</span></li>                                
            </div> */}

            {/* {transaction &&
                <div className="tracker-list-items">
                    <li className='tracker-list-item-income'>Cash <span className='tracker-list-item-amount'>$500</span></li>
                </div>
            }         */}



            {/* {text.map((el,index)=><li key={index}>{text[index].text}</li>)} */}
            

            {/* <div className="tracker-list-items">            
            {text.map((el,index)=><li key={index}>{text[index].text}</li>)}
            </div> */}

            
        </div>
    )
}

export default TrackerList