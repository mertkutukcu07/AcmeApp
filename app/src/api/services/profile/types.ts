export interface ProfileUpdateRequest {
  name: string;
  surname: string;
  phone: string;
  profileImage: string;
  dateOfBirth: string;
  address: Address;
}

export interface ProfileUpdateData {
  name: string;
  surname: string;
  phone: string;
  profileImage: string;
  dateOfBirth: string;
  city: string;
  country: string;
  address: string;
}

export interface Address {
  details: string;
  city: string;
  country: string;
}

export interface ProfileResponse {
  appliedJobs: string[];
  skills: string[];
  profileImage: string;
  name: string;
  phone: string;
  id: string;
  email: string;
  dateOfBirth: string;
  surname: string;
  address: Address;
}
