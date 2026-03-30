import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Hotel } from "../../types/hotel";
import axios from "../../lib/axios";

// API call with Axios
export const fetchHotels = createAsyncThunk<
  Hotel[],
  void,
  { rejectValue: string }
>(
  "hotels/fetchHotels",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/hotels");
      return res?.data; //  optional chaining (API safety)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch hotels" //  correct use
      );
    }
  }
);

interface HotelState {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
}

const initialState: HotelState = {
  hotels: [],
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchHotels.fulfilled,
        (state, action: PayloadAction<Hotel[]>) => {
          state.hotels = action.payload; //  no need for ?.
          state.loading = false;
        }
      )
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload ?? "Something went wrong"; //  safe
      });
  },
});

export default hotelSlice.reducer;