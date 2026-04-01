//api/lib/service/hotel.service.ts


import { ENDPOINT } from "../api/apiEndpoint";
import axiosInstance from "../axios/axios";

export const getHotelListService = async () =>
  await axiosInstance.get(ENDPOINT.HOTEL_LIST);
