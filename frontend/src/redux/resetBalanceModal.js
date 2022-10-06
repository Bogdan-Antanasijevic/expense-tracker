import { createSlice } from '@reduxjs/toolkit';

const resetBalanceSlice = createSlice({
    name: 'resetBalanceModal',
    initialState: {        
        showModal: false        
    },    
    reducers: {                
        showResetBalanceModal: (state,
                 action ) => {                                                                                     
            state.showModal = action.payload;                         

        },
    },
});

export const {showResetBalanceModal} = resetBalanceSlice.actions;
export default resetBalanceSlice.reducer;
