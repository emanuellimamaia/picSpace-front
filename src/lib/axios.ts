import axios from "axios";
import { parseCookies } from "nookies";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const cookies = parseCookies();
  const token = cookies["picspace.token"];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
