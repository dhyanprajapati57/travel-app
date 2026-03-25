import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authslice";
import bookingsReducer from "./slice/bookingslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;