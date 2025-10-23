// lib/axios.ts
import axios from "axios";

const isServer = typeof window === "undefined";
console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

const baseURL = `${
  isServer ? process.env.NEXT_PUBLIC_API_BASE_URL : ""
}/api/github`;

export const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
