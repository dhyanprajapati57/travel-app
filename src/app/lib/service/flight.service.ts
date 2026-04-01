// lib/service/flight.service.ts

import axiosInstance from "../axios/axios";
import { ENDPOINT } from "../api/apiEndpoint";

export const getFlightListService = async () =>
  await axiosInstance.get(ENDPOINT.FLIGHT_LIST);    