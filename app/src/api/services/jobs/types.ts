export interface JobResponse {
  nextCursor: number | null | undefined;
  previousCursor: number | null | undefined;
  data: Jobs[];
  meta: Meta;
}

export interface Jobs {
  companyName: string;
  keywords: string[];
  id: string;
  description: string;
  name: string;
  createdAt: string;
  location: string;
  salary: number;
}

export interface Meta {
  total: number;
  page: number;
  perPage: number;
}

export interface JobParams {
  search?: {
    query: string;
    field?: string;
  };
  orderBy?: {
    field?: string;
    direction?: string;
  };
  pageParam?: number;
  page?: number;
  perPage?: number;
}

export interface JobDetailsRequest {
  id: string;
}

export interface JobOperationRequest {
  id: string;
}

export interface JobOperationResponse {
  message: string;
}

export interface AppliedJobRequest {
  appliedJobs: string[];
}
