import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authslice";
import bookingsReducer from "./slice/bookingslice";
import flightReducer from "./slice/flightslice";
import hotelReducer from "./slice/hotelslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingsReducer,
    flights: flightReducer,
    hotels: hotelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
