import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState, store } from "../../app/store";

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface Params {
  breeds: string[];
  ageMin: number | null;
  ageMax: number | null;
  city: string | null;
  states: string | null;
}

interface SearchInfo {
  nextPage: string | null;
  prevPage: string | null;
  total: number | null;
}

interface DogState {
  currentIds: string[];
  currentDogs: Dog[];
  savedIds: string[];
  status: "idle" | "loading" | "failed";
  searchParams: Params;
  searchInfo: SearchInfo;
}

const initialState: DogState = {
  currentIds: [],
  currentDogs: [],
  savedIds: [],
  status: "idle",
  searchParams: {
    breeds: [],
    ageMin: null,
    ageMax: null,
    city: null,
    states: null,
  },
  searchInfo: {
    nextPage: null,
    prevPage: null,
    total: null,
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
  extraReducers: (builder) => {
    builder.addCase(fetchDogs.fulfilled, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
      state.currentIds = action.payload.resultIds;
      state.searchInfo = {
        nextPage: action.payload.next,
        prevPage: action.payload.prev,
        total: action.payload.total,
      };
      state.currentDogs = action.payload.dogs;
    });
    builder.addCase(fetchDogs.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const { setSearchParams } = dogReducer.actions;

const API_URL = "https://frontend-take-home-service.fetch.com";

export const selectParams = (state: RootState) => state.dogs.searchParams;

/**
 * Sets the breed parameters for the search.
 * @param breed - The breed to set.
 */
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

/**
 * Sets the age parameters for the search.
 * @param ageMin - The minimum age.
 * @param ageMax - The maximum age.
 */
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

/**
 * Sets the city parameter for the search.
 * @param city - The city to set.
 */
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

/**
 * Sets the state parameters for the search.
 * @param states - A comma-separated string of state abbreviations.
 */
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

/**
 * Fetches dog breeds from the API.
 */
export const getBreeds = createAsyncThunk("dogs/getBreeds", async () => {
  return axios
    .get(API_URL + "/dogs/breeds", { withCredentials: true })
    .then((res) => res.data);
});

/**
 * Fetches dog data based on search parameters.
 */
export const fetchDogs = createAsyncThunk(
  "dogs/fetchDogs",
  async (params: Params) => {
    const queryParams = new URLSearchParams();

    if (params.city || params.states) {
      // get location data
    }

    if (params.breeds.length > 0) {
      queryParams.append("breeds", params.breeds.join(","));
    }

    if (params.ageMin) {
      queryParams.append("ageMin", params.ageMin.toString());
    }

    if (params.ageMax) {
      queryParams.append("ageMax", params.ageMax.toString());
    }

    // get ids of dogs that match search params
    let idsRequestConfig = {
      method: "get",
      url: `${API_URL}/dogs/search?${queryParams}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const ids = await axios.request(idsRequestConfig).then((res) => res.data);

    // get dog data from ids, plus pagination
    let dogsRequestConfig = {
      method: "post",
      url: `${API_URL}/dogs`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: ids.resultIds,
    };

    const dogs = await axios.request(dogsRequestConfig).then((res) => res.data);
    const result = {
      resultIds: ids.resultIds,
      next: ids.next,
      prev: ids.prev,
      total: ids.total,
      dogs: dogs,
    };

    return result;
  }
);

export default dogReducer.reducer;
