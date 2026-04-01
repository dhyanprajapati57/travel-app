// lib/service/auth.service.ts

import axiosInstance from "../axios/axios";
import { ENDPOINT } from "../api/apiEndpoint";

export const loginService = async (data: {
  email: string;
  password: string;
}) => await axiosInstance.post(ENDPOINT.LOGIN, data);

export const registerService = async (data: {
  name: string;
  email: string;
  password: string;
}) => await axiosInstance.post(ENDPOINT.REGISTER, data);