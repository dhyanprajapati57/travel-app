import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true, //  important for cookies
});

export default axiosInstance;