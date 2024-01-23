import axios from "axios";
import { apiUrl } from "./GlobalVars";

const axiosInstance = axios.create({
  baseURL: `${apiUrl}`,
  withCredentials: true,
});

export default axiosInstance;
