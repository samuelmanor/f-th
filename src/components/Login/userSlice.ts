import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserState {
  status: string;
}

const initialState: UserState = {
  status: "idle",
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(login.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const {} = userReducer.actions;

const API_URL = "https://frontend-take-home-service.fetch.com";

export const login = createAsyncThunk(
  "user/login",
  async (data: { name: string; email: string }) => {
    let user = JSON.stringify(data);

    let config = {
      method: "post",
      url: `${API_URL}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
      withCredentials: true,
    };

    const response = await axios.request(config);
    return response.data;
  }
);

export default userReducer.reducer;
