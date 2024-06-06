export interface ProfileUpdateRequest {
  name: string;
  surname: string;
  phone: string;
  profileImage: string;
  dateOfBirth: string;
  address: Address;
  skills: string[];
  experiences: Experience[];
  education: Education[];
  languages: Language[];
}

export interface Address {
  details: string;
  city: string;
  country: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface ProfileResponse {
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
