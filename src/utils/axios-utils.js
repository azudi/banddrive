import axios from "axios";

export const BASE_URL = "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1";

export const server = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
});

server.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // ...code goes here
    }

    return Promise.reject(error);
  }
);
