import axios from "axios";

export const LocalAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const GitAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GIT_URL,
});
