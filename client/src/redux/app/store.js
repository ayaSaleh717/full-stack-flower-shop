import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../feature/cartSlice";
import authSlice from "../feature/authSlice"; 

// create store
export const store = configureStore({
    reducer:{
        allCart:cartSlice,
        auth: authSlice 
    }
})