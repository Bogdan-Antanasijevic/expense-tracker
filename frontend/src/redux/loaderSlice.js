import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {        
        show: false        
    },    
    reducers: {        
        //action
        showLoader: (state,
                 action ) => {                                                                                     
            state.show = action.payload;   
            console.log(state.show);         

        },
    },
});

export const {showLoader} = loaderSlice.actions;
export default loaderSlice.reducer;
