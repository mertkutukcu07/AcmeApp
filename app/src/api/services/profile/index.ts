import { createMutation, createQuery } from "react-query-kit";
import { ProfileResponse, ProfileUpdateRequest } from "./types";
import axios, { AxiosError } from "axios";
import { queryKeys } from "@/api/keys";
import { axiosInstance } from "@/api/axios/api";

export const useUpdateProfile = createMutation<
  ProfileResponse,
  ProfileUpdateRequest,
  AxiosError
>({
  mutationKey: [queryKeys.PROFILE_UPDATE],
  mutationFn: async (req: ProfileUpdateRequest) => {
    const { data } = await axiosInstance.put<ProfileResponse>("api/user", req);
    return data;
  },
});
