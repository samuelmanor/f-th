import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  accessToken: string;
  status: string;
}

const initialState: UserState = {
  accessToken: "",
  status: "idle",
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = userReducer.actions;

export const login = createAsyncThunk(
  "user/login",
  async (user: { name: string; email: string }) => {
    console.log({ user });
  }
);

export default userReducer.reducer;
