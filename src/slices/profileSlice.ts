import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// initialstate
const initialState = {
  user: null,
};

// profileslice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state,action: PayloadAction<any>){
      state.user = action.payload;
    },
  },
});

// Export actions
export const { setUser } = profileSlice.actions;

// Export reducer
export default profileSlice.reducer;
