import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {},    
    reducers: {        
        //action
        setNewTransaction: (state,action ) => {                 
            // const newTransaction = {
            //     id: Date.now(),
            //     text: action.payload.text,
            //     amount: action.payload.amount
            // }
            // state.push(newTransaction)            
            state = action.payload
        },
    },
});

export const {setNewTransaction} = transactionSlice.actions;
export default transactionSlice.reducer;
