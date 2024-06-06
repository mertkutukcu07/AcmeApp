import { createQuery } from "react-query-kit";
import { JobParams, JobResponse } from "./types";
import { AxiosError } from "axios";
import { queryKeys } from "@/api/keys";
import { axiosInstance } from "@/api/axios/api";

export const useGetJobs = createQuery<JobResponse, JobParams, AxiosError>({
  queryKey: [queryKeys.JOBS],
  fetcher: async (params) => {
    const { data } = await axiosInstance.get("/jobs", { params });
    return data;
  },
});
