import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// initialstate
const initialState: any = {
    isOpenSidebar:false
};

// slice
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsOpenSidebar(state,action: PayloadAction<boolean | undefined>){
        if(typeof action.payload === "boolean"){
            state.isOpenSidebar = action.payload;
        }
        else{
            state.isOpenSidebar = !state.isOpenSidebar;
        }
    }
  },
});

// Export actions
export const { setIsOpenSidebar } = globalSlice.actions;

// Export reducer
export default globalSlice.reducer;
