import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import bookingsReducer from "./slice/booking.slice";
import flightReducer from "./slice/flight.slice";
import hotelReducer from "./slice/hotel.slice";

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
