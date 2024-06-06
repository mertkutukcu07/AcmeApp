import { createQuery } from "react-query-kit";
import { ProfileResponse, ProfileUpdateRequest } from "./types";
import axios, { AxiosError } from "axios";
import { queryKeys } from "@/api/keys";
import { axiosInstance } from "@/api/axios/api";

export const useUpdateProfile = createQuery<
  ProfileResponse,
  ProfileUpdateRequest,
  AxiosError
>({
  queryKey: [queryKeys.PROFILE],
  fetcher: async (req: ProfileUpdateRequest) => {
    const { data } = await axiosInstance.put<ProfileResponse>("api/user", req);
    return data;
  },
});
