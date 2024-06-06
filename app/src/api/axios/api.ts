import { loadString, saveString } from "@/utils/storage";
import axios from "axios";
import { AuthResponse } from "../services/auth/types";
import { useAuthStore } from "@/store/authStore";

const axiosInstance = axios.create({
  baseURL: "https://novel-project-ntj8t.ampt.app/",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await loadString("refreshToken");
      if (refreshToken !== null) {
        try {
          const response = await axiosInstance.post<AuthResponse>(
            "api/refresh",
            {
              refreshToken,
            }
          );
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;
          useAuthStore.getState().signIn(newAccessToken, newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (error) {
          useAuthStore.getState().signOut();
        }
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
