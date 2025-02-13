import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "../components/Login/userSlice";
import dogReducer from "../components/Dog/dogSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dogs: dogReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
