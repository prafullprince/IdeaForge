import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// SignUpData types
interface SignUpData {
  name: string;
  accountType: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// initialState types
interface AuthState {
  signupData: SignUpData | null;
  token: string | null;
  userImage: string
}

// initialstate
const initialState: AuthState = {
  signupData: null,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : null,
  userImage: localStorage.getItem("image") ? JSON.parse(localStorage.getItem("image") as string) : null
};

// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action: PayloadAction<SignUpData>) {
      state.signupData = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserImage(state,action: PayloadAction<string>){
      state.userImage = action.payload;
    },
    logOut(state){
      state.token = null;
    }
  },
});

// Export actions
export const { setSignupData, setToken, setUserImage, logOut } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
