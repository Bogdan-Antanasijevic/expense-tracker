import React from 'react';
import './loader.scss'
import loaderStore from '../../redux/store'
import {useSelector} from "react-redux";

function Loader() {        
    const {show} = useSelector(state => state.loaderStore);
    console.log(show);    
    return (
        <>
            {show && <div className="loader-wrapper">
                <div className="loader"></div>
            </div> }
        </>

    );
}

export default Loader;
