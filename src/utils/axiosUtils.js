import axios from "axios";
import { setLoader } from "../redux/actionCreators";
import store from "../redux/store";

const MAX_RETRIES = 1;
const INVALID_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg";
const INVALID_REFRESH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjcyODAyMDI4fQ.P1_rB3hJ5afwiG4TWXLq6jOAcVJkvQZ2Z-ZZOnQ1dZw";

let setInvalidAccessToken = true;
let setInvalidRefreshToken = false;

let retryCount = 0;

const axiosInstance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    let accessToken;

    if (setInvalidAccessToken) {
      accessToken = INVALID_ACCESS_TOKEN;
      setInvalidAccessToken = false;
    } else {
      accessToken = localStorage.getItem("access_token");
    }

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    store.dispatch(setLoader(true));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(setLoader(false));
    return response;
  },
  async (error) => {
    const statusCode = error.response.data.statusCode;

    if (statusCode === 401 && retryCount < MAX_RETRIES) {
      retryCount++;

      let refreshToken;

      if (setInvalidRefreshToken) {
        refreshToken = INVALID_REFRESH_TOKEN;
      } else {
        refreshToken = localStorage.getItem("refresh_token");
      }

      if (refreshToken) {
        const refreshResponse = await axiosInstance.post("auth/refresh-token", {
          refreshToken: refreshToken,
        });

        const newAccessToken = refreshResponse.data.access_token;
        const newRefreshToken = refreshResponse.data.refresh_token;

        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);

        const originalRequest = error.config;
        return axiosInstance(originalRequest);
      }
    }

    store.dispatch(setLoader(false));
    return Promise.reject(error);
  },
);

export default axiosInstance;
