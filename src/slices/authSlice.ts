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
}

// initialstate
const initialState: AuthState = {
  signupData: null,
  token: null,
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
  },
});

// Export actions
export const { setSignupData, setToken } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
