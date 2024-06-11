export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfoResponse {
  appliedJobs: string[];
  profileImage: string;
  name: string;
  phone: string;
  id: string;
  email: string;
  dateOfBirth: string;
  surname: string;
  address: Address;
}

export interface Address {
  city: string;
  country: string;
  details: string;
}
