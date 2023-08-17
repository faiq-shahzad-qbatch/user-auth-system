import axios from "axios";
import { setLoader } from "../redux/actionCreators";
import store from "../redux/store";

const axiosInstance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");

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
  (error) => {
    store.dispatch(setLoader(false));
    return Promise.reject(error);
  },
);

export default axiosInstance;
