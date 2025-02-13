import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState, store } from "../../app/store";

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
  ids: string[];
  status: "idle" | "loading" | "failed";
  searchParams: Params;
  searchInfo: SearchInfo;
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
    setSearchInfo: (state, action: PayloadAction<SearchInfo>) => {
      state.searchInfo = action.payload;
    },
  },
});

export const { setSearchParams } = dogReducer.actions;

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

/**
 * Saves search information to the Redux store.
 * @param {SearchInfo} info - The search information to save.
 * @example
 * ```
 * saveSearchInfo({
 *  nextPage: "https://example.com/next",
 *  prevPage: "https://example.com/prev",
 *  total: 100,
 * })
 * ```
 */
const saveSearchInfo = (info: SearchInfo): AppThunk => {
  return (dispatch) => {
    dispatch(
      dogReducer.actions.setSearchInfo({
        ...info,
      })
    );
  };
};

/**
 * Fetches dog data based on search parameters.
 */
export const getDogs = createAsyncThunk(
  "dogs/getDogs",
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

    let config = {
      method: "get",
      url: `${API_URL}/dogs/search?${queryParams}&from=25`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const response = await axios.request(config);
    console.log(response.data);

    saveSearchInfo({
      nextPage: response.data.next,
      prevPage: response.data.prev,
      total: response.data.total,
    });

    return response.data;
  }
);

export default dogReducer.reducer;
