import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/work/WorkSlice'

const store = configureStore({
    reducer:{
        user: userReducer
    }
})
export default store;