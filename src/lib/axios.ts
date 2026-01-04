import axios from "axios";
import http from "http";
import https from "https";

const isServer = typeof window === "undefined";

const serverDefaultHeaders = isServer
  ? {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
    }
  : {
      "Content-Type": "application/json",
    };

const baseURL = isServer
  ? process.env.APP_URL?.replace(/\/$/, "") + "/api"
  : "/api";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 8000,
  headers: serverDefaultHeaders,
  ...(isServer && {
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
  }),
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error(
      "Axios Error:",
      error.response?.status,
      error.response?.data?.message || error.message
    );
    return Promise.reject(error);
  }
);
