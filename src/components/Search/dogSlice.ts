import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../../app/store";

interface Params {
  breeds: string[];
  ageMin: number | null;
  ageMax: number | null;
  city: string | null;
  states: string | null;
}

interface DogState {
  ids: string[];
  status: "idle" | "loading" | "failed";
  searchParams: Params;
}

const initialState: DogState = {
  ids: [],
  status: "idle",
  searchParams: {
    breeds: [],
    ageMin: null,
    ageMax: null,
    city: null,
    states: null,
  },
};

const dogReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<Params>) => {
      state.searchParams = action.payload;
      console.log(state.searchParams);
    },
  },
});

export const {} = dogReducer.actions;

const API_URL = "https://frontend-take-home-service.fetch.com";

export const selectParams = (state: RootState) => state.dogs.searchParams;

export const setBreedParams = (breed: string): AppThunk => {
  return (dispatch, getState) => {
    const currentParams = selectParams(getState());

    if (currentParams.breeds.includes(breed)) {
      dispatch(
        dogReducer.actions.setSearchParams({
          ...currentParams,
          breeds: currentParams.breeds.filter((b) => b !== breed),
        })
      );
    } else {
      dispatch(
        dogReducer.actions.setSearchParams({
          ...currentParams,
          breeds: [...currentParams.breeds, breed],
        })
      );
    }
  };
};

export const setAgeParams = (ageMin: number, ageMax: number): AppThunk => {
  return (dispatch, getState) => {
    const currentParams = selectParams(getState());
    // check if ageMin and ageMax are valid
    let validMin: number | null = ageMin;
    let validMax: number | null = ageMax;

    if (ageMin < 0) {
      validMin = 0;
    } else if (ageMin > ageMax) {
      validMin = ageMax;
    }

    if (ageMax < 0) {
      validMax = 0;
    } else if (ageMax < ageMin) {
      validMax = ageMin;
    }

    if (validMin === 0 && validMax === 0) {
      validMin = null;
      validMax = null;
    }

    dispatch(
      dogReducer.actions.setSearchParams({
        ...currentParams,
        ageMin: validMin,
        ageMax: validMax,
      })
    );
  };
};

export const setCityParams = (city: string): AppThunk => {
  return (dispatch, getState) => {
    const currentParams = selectParams(getState());
    dispatch(
      dogReducer.actions.setSearchParams({
        ...currentParams,
        city: city,
      })
    );
  };
};

export const setStateParams = (states: string): AppThunk => {
  return (dispatch, getState) => {
    const currentParams = selectParams(getState());

    // check if states are valid
    let arr = states.split(",");
    arr = arr
      .map((state) => {
        let validState = state.trim().toUpperCase();
        if (validState.length !== 2) {
          validState = "";
        }
        return validState;
      })
      .filter((state) => state !== "");

    const validatedStates = arr.join(",");

    if (validatedStates !== currentParams.states) {
      dispatch(
        dogReducer.actions.setSearchParams({
          ...currentParams,
          states: validatedStates,
        })
      );
    }
  };
};

export const getBreeds = createAsyncThunk("dogs/getBreeds", async () => {
  return axios
    .get(API_URL + "/dogs/breeds", { withCredentials: true })
    .then((res) => res.data);
});

export default dogReducer.reducer;
