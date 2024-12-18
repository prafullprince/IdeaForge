import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// SignUpData types
interface SignUpData {
  name: string;
  accountType: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// interface IUser {
//   name: string,
//   accountType: string,
//   email: string,
// }

// initialState types
interface AuthState {
  signupData: SignUpData | null;
  token: string | null;
}

// initialstate
const initialState: AuthState = {
  signupData: null,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : null,
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
    logOut(state){
      state.token = null;
    },
  },
});

// Export actions
export const { setSignupData, setToken, logOut } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
