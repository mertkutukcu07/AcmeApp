import {
  createInfiniteQuery,
  createMutation,
  createQuery,
} from "react-query-kit";
import {
  AppliedJobRequest,
  JobDetailsRequest,
  JobOperationRequest,
  JobOperationResponse,
  JobParams,
  JobResponse,
  Jobs,
} from "./types";
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
    const params: JobParams = {
      page: pageParam,
      perPage: 10,
    };

    if (req.search?.field && req.search?.query) {
      params.search = {
        field: req.search.field,
        query: req.search.query,
      };
    }

    const { data } = await axiosInstance.get<JobResponse>(`api/jobs`, {
      params,
    });
    return data;
  },
  getNextPageParam: (lastPage, allPages) => {
    return allPages.length;
  },
  initialPageParam: 1,
});

export const useGetJobDetails = createQuery<
  Jobs,
  JobDetailsRequest,
  AxiosError
>({
  queryKey: [queryKeys.JOBS_DETAILS],
  fetcher: async (req: JobDetailsRequest) => {
    const { data } = await axiosInstance.get<Jobs>(`api/jobs/${req.id}`);
    return data;
  },
});

export const useApplyJob = createMutation<
  JobOperationResponse,
  JobOperationRequest,
  AxiosError
>({
  mutationKey: [queryKeys.JOBS_APPLY],
  mutationFn: async (req: JobOperationRequest) => {
    const { data } = await axiosInstance.post<JobOperationResponse>(
      `api/jobs/${req.id}/apply`,
      req.id
    );
    return data;
  },
});

export const useWithdrawJob = createMutation<
  JobOperationResponse,
  JobOperationRequest,
  AxiosError
>({
  mutationKey: [queryKeys.JOBS_WITHDRAW],
  mutationFn: async (req: JobOperationRequest) => {
    const { data } = await axiosInstance.post<JobOperationResponse>(
      `api/jobs/${req.id}/withdraw`
    );
    return data;
  },
});

export const useAppliedJobs = createQuery<
  Jobs[],
  AppliedJobRequest,
  AxiosError
>({
  queryKey: [queryKeys.APPLIED_JOBS],
  fetcher: async (req: AppliedJobRequest) => {
    const data = await Promise.all(
      req.appliedJobs.map(async (jobId) => {
        const { data } = await axiosInstance.get<Jobs>(`api/jobs/${jobId}`);
        return data;
      })
    );
    return data;
  },
});
