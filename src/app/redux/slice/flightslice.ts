import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Flight } from "../../types/flight";
import axios from "../../lib/axios";

//  Axios API call with typing
export const fetchFlights = createAsyncThunk<
  Flight[], //  success type
  void,     //  no argument
  { rejectValue: string } //  error type
>(
  "flights/fetchFlights",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/flight");
      return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch flights"
      );
    }
  }
);

interface FlightState {
  flights: Flight[];
  loading: boolean;
  error: string | null;
}

const initialState: FlightState = {
  flights: [],
  loading: false,
  error: null,
};

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFlights.fulfilled,
        (state, action: PayloadAction<Flight[]>) => {
          state.flights = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default flightSlice.reducer;