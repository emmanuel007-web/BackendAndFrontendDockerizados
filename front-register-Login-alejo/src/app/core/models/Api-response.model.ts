export interface ApiResponse<T = unknown> {
  message?: string;
  data?:    T;
  status?:  number;
}

export interface User {
  userId:   number;
  username: string;
  email:    string;
}

export interface AuthResponse {
  token:    string;
  username: string;
  email:    string;
  userId:   number;
}