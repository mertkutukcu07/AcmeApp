import { createInfiniteQuery } from "react-query-kit";
import { JobParams, JobResponse } from "./types";
import { AxiosError } from "axios";
import { queryKeys } from "@/api/keys";
import { axiosInstance } from "@/api/axios/api";

export const useGetJobs = createInfiniteQuery<
  JobResponse,
  JobParams,
  AxiosError
>({
  queryKey: [queryKeys.JOBS],
  fetcher: async (req: JobParams, { pageParam }) => {
    const { data } = await axiosInstance.get<JobResponse>(`api/jobs`, {
      params: {
        page: pageParam,
        perPage: 10,
      },
    });
    return data;
  },
  getNextPageParam: (lastPage, allPages) => {
    return allPages.length;
  },
  initialPageParam: 1,
});
