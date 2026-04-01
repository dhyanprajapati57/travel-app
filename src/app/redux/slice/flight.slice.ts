import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Flight } from "../../utils/types/flight";
import { AppDispatch } from "../store";
import { getFlightListService } from "@/app/lib/service/flight.service";

interface FlightState {
  flights: Flight[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: FlightState = {
  flights: [],
  loading: false,
  error: null,
  message: null,
};

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action: PayloadAction<Flight[]>) => {
      state.flights = action.payload;
      state.loading = false;
      state.message = "Flights fetched successfully";
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    reset: (state) => {
      state.flights = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, reset } =
  flightSlice.actions;

export default flightSlice.reducer;



export const getFlights = () => async (dispatch: AppDispatch) => {
  dispatch(fetchStart());

  try {
    const res = await getFlightListService();
    dispatch(fetchSuccess(res.data));
  } catch (error) {
    console.error("[getFlights error:]", error);
    dispatch(fetchFailure("Failed to fetch flights"));
  }
};