import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// initialstate
const initialState: any = {
    totalItems: localStorage.getItem("length") ? JSON.parse(localStorage.getItem("length") as string) : 0,
    items: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") as string) : []
};

// slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   setItems(state:any,action: PayloadAction<any>){
    const item = action.payload;
    state.items = [...state.items,item];
    state.totalItems = state.items.length;
    localStorage.setItem("length",JSON.stringify(state.totalItems));
    localStorage.setItem("cart",JSON.stringify(state.items));
   },
   removeItems(state:any,action:PayloadAction<any>){
    const itemInBody = action.payload;
    const remainedCart = state.items?.filter((item:any)=> item?._id !== itemInBody);
    state.items = remainedCart;
    state.totalItems = state.items.length;
    localStorage.setItem("length",JSON.stringify(state.totalItems));
    localStorage.setItem("cart",JSON.stringify(state.items));
   }
  },
});

// Export actions
export const { setItems, removeItems } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
