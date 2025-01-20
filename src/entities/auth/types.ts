export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends TokenResponse {
  id: number;
  email: string;
  nickname: string;
  profileImg: string;
  lastLoginDate: string;
}

export interface SignupRequest extends LoginRequest {
  nickname: string;
  profileImg: File | null;
}

export interface SignupResponse {}