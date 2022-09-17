import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './loader.scss'

function Loader() {
    const {show} = useSelector(state=>state.loaderStore)
    return (
        <>
            {show && <div className='overlay'>
                <span className='loader'></span>                
            </div>}
        </>

    );
}

export default Loader;
