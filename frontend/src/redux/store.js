import {configureStore} from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";
import transactionSlice from "./transactionSlice";
import resetBalanceModalSlice from "./resetBalanceModal";

export default configureStore({
    reducer:{
        loaderStore: loaderSlice,
        resetBalanceModalStore: resetBalanceModalSlice,
        transactionStore: transactionSlice,        
    }    
})