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
  userImage: string,
  user: any
}

// initialstate
const initialState: AuthState = {
  signupData: null,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : null,
  userImage: localStorage.getItem("image") ? JSON.parse(localStorage.getItem("image") as string) : null,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
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
    },
    setUser(state,action: PayloadAction<any>){
      state.user = action.payload;
    }
  },
});

// Export actions
export const { setSignupData, setToken, setUserImage, logOut, setUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
