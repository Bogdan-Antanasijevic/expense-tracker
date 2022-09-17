import {configureStore} from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";
import transactionSlice from "./transactionSlice";

export default configureStore({
    reducer:{
        loaderStore: loaderSlice,
        transactionStore: transactionSlice,        
    }    
})