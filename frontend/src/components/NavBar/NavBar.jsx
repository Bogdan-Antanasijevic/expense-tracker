import React from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './navBar.scss'
import { FaSignOutAlt } from 'react-icons/fa'
import { showLoader } from '../../redux/loaderSlice'



function NavBar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
        
    const onLogout = ()=>{
        dispatch(showLoader(true));
        localStorage.clear()
        navigate('/')
        dispatch(showLoader(false));
    }

    return (
        <div className='nav'>
            <a className='logo' href="/home"></a>
            <li>
                <button className='btn btn-dark' onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                </button>
            </li>
        </div>
    )
}

export default NavBar