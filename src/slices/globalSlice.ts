import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initialstate
const initialState: any = {
  isOpenSidebar: false,
  chatter: null,
  isOpenChatSidebar: false,
  fullScreen: false
};

// slice
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsOpenSidebar(state, action: PayloadAction<boolean | undefined>) {
      if (typeof action.payload === "boolean") {
        state.isOpenSidebar = action.payload;
      } else {
        state.isOpenSidebar = !state.isOpenSidebar;
      }
    },
    setChatter(state, action: PayloadAction<any>) {
      state.chatter = action.payload;
    },
    setIsOpenChatSidebar(state, action: PayloadAction<boolean | undefined>) {
      if (typeof action.payload === "boolean") {
        state.isOpenChatSidebar = action.payload;
      } else {
        state.isOpenChatSidebar = !state.isOpenChatSidebar;
      }
    },
    setFullScreen(state){
      state.fullScreen = !state.fullScreen;
    }
  },
});

// Export actions
export const { setIsOpenSidebar, setChatter, setIsOpenChatSidebar, setFullScreen } =
  globalSlice.actions;

// Export reducer
export default globalSlice.reducer;
