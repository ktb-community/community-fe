import { HttpStatusCode } from 'axios';
import axiosInstance from '@/shared/config/axios.ts';
import { ApiResponse } from '@/shared/types/api.ts';
import { LoginRequest, LoginResponse } from '@/entities/auth/types.ts';

export const login = async (loginRequest: LoginRequest) => {
  const res = await axiosInstance.post<ApiResponse<LoginResponse>>('/auth/login', loginRequest);
  if (res.status === HttpStatusCode.Ok) return Promise.resolve(res.data);
  else return Promise.reject(res);
};

export const logout = async () => {
  const res = await axiosInstance.post<ApiResponse<null>>('/auth/logout');
  if (res.status === HttpStatusCode.Ok) return Promise.resolve(res);
  else return Promise.reject(res);
};

export const signup = async (signupRequest: FormData) => {
  const res = await axiosInstance.post<ApiResponse<null>>('/auth/signup', signupRequest, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  if (res.status === HttpStatusCode.Created) return Promise.resolve(res);
  else return Promise.reject(res);
};