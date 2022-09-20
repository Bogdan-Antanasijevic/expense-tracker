import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: [],
    reducers: {
        //action
        setNewTransaction: (state, action) => {                                             
             state = state.push(action.payload)                                   
        },

    },
});

export const { setNewTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
