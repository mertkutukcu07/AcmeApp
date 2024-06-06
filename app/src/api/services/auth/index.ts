import { createMutation } from "react-query-kit";
import { AuthRequest, AuthResponse } from "./types";
import { queryKeys } from "@/api/keys";
import { axiosInstance } from "@/api/axios/api";
import { AxiosError } from "axios";
import { Message } from "@/components";

export const useLogin = createMutation<AuthResponse, AuthRequest, AxiosError>({
  mutationKey: [queryKeys.LOGIN],
  mutationFn: async (req: AuthRequest) => {
    const { data } = await axiosInstance.post<AuthResponse>("api/login", req);
    return data;
  },
  onError: (error) => {
    Message({
      type: "error",
      // @ts-ignore
      message: error.response?.data.message,
    });
  },
});

export const useRegister = createMutation<
  AuthResponse,
  AuthRequest,
  AxiosError
>({
  mutationKey: [queryKeys.REGISTER],
  mutationFn: async (req: AuthRequest) => {
    const { data } = await axiosInstance.post<AuthResponse>(
      "api/register",
      req
    );
    return data;
  },
  onError: (error) => {
    Message({
      type: "error",
      // @ts-ignore
      message: error.response?.data.message,
    });
  },
});
