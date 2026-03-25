import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Booking {
  id: number;
  type: "flight" | "hotel";
  name: string;
  date: string;
}

interface BookingState {
  bookings: Booking[];
}

const initialState: BookingState = {
  bookings: [],
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    clearBookings: (state) => {
      state.bookings = [];
    },
  },
});

export const { addBooking, clearBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;