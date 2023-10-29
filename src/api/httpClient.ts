import axios from "axios";
import { SERVER_URL, TOKEN_KEY } from "constants/auth";

const instance = axios.create({
  baseURL: SERVER_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    config.withCredentials = true;
    config.headers.Authorization = `Bearer ${token ?? ""}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
