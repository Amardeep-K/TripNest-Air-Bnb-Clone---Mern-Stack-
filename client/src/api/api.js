import axios from "axios";
import { configDotenv } from "dotenv";
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_SERVER_URL}`, // backend URL
   withCredentials: true,
});

export default api;
