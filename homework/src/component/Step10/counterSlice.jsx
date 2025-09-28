import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    counter: 0
}
const counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        increase:{
            
            reducer(state){
                state.counter  += 1 
            }

        },
        reduce:{
            reducer(state){
                if(state.counter <= 0) return;
                state.counter  -= 1 
            }

        }
            
        
    }
})

export const {increase,reduce} = counterSlice.actions;
export default counterSlice.reducer;