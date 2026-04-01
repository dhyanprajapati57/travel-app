// lib/service/booking.service.ts

import axiosInstance from "../axios/axios";
import { ENDPOINT } from "../api/apiEndpoint";

export const getBookingsService = async () =>
  await axiosInstance.get(ENDPOINT.BOOKINGS);