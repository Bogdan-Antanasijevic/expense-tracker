import React, { useEffect } from 'react';
import './loader.scss'

function Loader() {
    return (
        <>
            <div className='overlay'>
                <span className='loader'></span>                
            </div>
        </>

    );
}

export default Loader;
