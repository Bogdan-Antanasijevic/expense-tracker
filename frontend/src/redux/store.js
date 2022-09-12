import {configureStore} from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";

export default configureStore({
    reducer:{
        loaderStore: loaderSlice,
    }    
})