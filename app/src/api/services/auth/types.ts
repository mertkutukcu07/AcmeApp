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
  skills: string[];
  profileImage: string;
  name: string;
  phone: string;
  id: string;
  languages: Language[];
  email: string;
  education: Education[];
  dateOfBirth: string;
  surname: string;
  address: Address;
  experiences: Experience[];
}

export interface Language {
  level: string;
  language: string;
}

export interface Education {
  degree: string;
  institution: string;
  endDate: string;
  startDate: string;
}

export interface Address {
  city: string;
  country: string;
  details: string;
}

export interface Experience {
  company: string;
  position: string;
  endDate: string;
  startDate: string;
}
