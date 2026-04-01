import { Hotel } from "../../utils/types/hotel";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHotelListService } from "@/app/lib/service/hotel.service";

interface HotelListState {
  data: Hotel[];
  loading: boolean;
  error: string | null;
}

const initialState: HotelListState = {
  data: [],
  loading: false,
  error: null,
};

//  Async Thunk (BEST PRACTICE)
export const getHotelList = createAsyncThunk(
  "hotels/getHotelList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getHotelListService();
      return response?.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue("Failed to fetch hotels");
    }
  }
);

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {},

  //  Clean handling
  extraReducers: (builder) => {
    builder
      .addCase(getHotelList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHotelList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
      })
      .addCase(getHotelList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default hotelSlice.reducer;