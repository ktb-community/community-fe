export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  nickname: string;
  profile: string;
  lastLoginDate: string;
}

export interface SignupRequest extends LoginRequest {
  nickname: string;
  profileImg: File | null;
}

export interface SignupResponse {}