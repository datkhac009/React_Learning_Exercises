import { configureStore } from "@reduxjs/toolkit";

import countReducer from "./counterSlice"
const store = configureStore({
  reducer:{
    count : countReducer,
  }
});

export default store;
