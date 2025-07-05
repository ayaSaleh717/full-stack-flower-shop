import { createSlice } from "@reduxjs/toolkit";


const initialState={
    cart:[],
}

 const cartSlice = createSlice({
    name:'cartSlice',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            
            const IteamIndex = state.cart.findIndex((iteam) => iteam.proId === action.payload.proId);

            if (IteamIndex >= 0) {
                state.cart[IteamIndex].qunty += 1
            } else {
                const temp = { ...action.payload, qunty: 1 }
                state.cart = [...state.cart, temp]

            }
        },
              // remove perticular iteams
        removeToCart:(state,action)=>{
            const data = state.cart.filter((ele)=>ele.proId !== action.payload);
            state.cart = data;
        },


        
        // remove single iteams
        removeSingleIteams:(state,action)=>{
            const IteamIndex_dec = state.cart.findIndex((iteam) => iteam.proId === action.payload.proId);

            if(state.cart[IteamIndex_dec].qunty >=1){
                state.cart[IteamIndex_dec].qunty -= 1
            }

        },

        // clear cart
        emptycartIteam:(state,action)=>{
            state.cart = []
        }
    
        

            // state.cart = [...state.cart , action.payload];

        }
    

});


export const { addToCart,removeToCart,removeSingleIteams ,emptycartIteam} = cartSlice.actions;

export default cartSlice.reducer;  