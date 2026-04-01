import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { getBookingsService } from "@/app/lib/service/booking.service";

interface Booking {
  id: number;
  type: "flight" | "hotel";
  name: string;
  date: string;
}

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
      state.loading = false;
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } =
  bookingSlice.actions;

export default bookingSlice.reducer;


// thunk
export const getBookings = () => async (dispatch: AppDispatch) => {
  dispatch(fetchStart());

  try {
    const res = await getBookingsService();
    dispatch(fetchSuccess(res.data));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    dispatch(fetchFailure("Failed to fetch bookings"));
  }
};