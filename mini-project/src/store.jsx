import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/WorkSlice'

const store = configureStore({
    reducer:{
        user: userReducer
    }
})
export default store;