export interface JobResponse {
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
  page: number;
  perPage: number;
  search?: {
    query: string;
    field?: string;
  };
  orderBy?: {
    field?: string;
    direction?: string;
  };
}
