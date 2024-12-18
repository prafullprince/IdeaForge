import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import globalSlice from './globalSlice';
import profileSlice from './profileSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    global: globalSlice,
    profile: profileSlice
  },
});

// Define RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
