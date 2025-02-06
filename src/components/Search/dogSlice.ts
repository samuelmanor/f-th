import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface DogState {
  ids: string[];
  status: "idle" | "loading" | "failed";
}

const initialState: DogState = {
  ids: [],
  status: "idle",
};

const dogReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = dogReducer.actions;

const API_URL = "https://frontend-take-home-service.fetch.com";

// export const fetchDogs = createAsyncThunk("dogs/fetchDogs", async () => {
//   console.log("fetching dogs");
// });

export const getBreeds = createAsyncThunk("dogs/getBreeds", async () => {
  return axios
    .get(API_URL + "/dogs/breeds", { withCredentials: true })
    .then((res) => res.data);
});

export const getZipCodes = createAsyncThunk("dogs/getZipCodes", async () => {
  return axios
    .get(API_URL + "/dogs/zip-codes", { withCredentials: true })
    .then((res) => res.data);
});

export default dogReducer.reducer;
