import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// initialstate
const initialState: any = {
    step:1
};

// slice
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep(state:any, action:PayloadAction<number>){
        state.step = action.payload
    }
  },
});

// Export actions
export const { setStep } = courseSlice.actions;

// Export reducer
export default courseSlice.reducer;
