import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/Login/userSlice";
import dogReducer from "../components/Search/dogSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dogs: dogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
