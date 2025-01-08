import axiosInstance from '@/shared/config/axios.ts';
import { ApiResponse } from '@/shared/types/api.ts';
import { UserEditResponse } from '@/entities/user/types.ts';
import { HttpStatusCode } from 'axios';

export const getUser = async (userId: number) => {
  const res = await axiosInstance.get<ApiResponse<UserEditResponse>>(`/users/${userId}`);
  if (res.status === 200) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
};

export const userEditProfileImage = async (userId: number, formData: FormData) => {
  const res = await axiosInstance.patch<ApiResponse<null>>(`/users/${userId}/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (res.status === 200) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
};

export const userEditNickname = async (userId: number, nickname: string) => {
  const res = await axiosInstance.patch<ApiResponse<null>>(`/users/${userId}/nickname`, { nickname });
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
};

export const userEditPassword = async (userId: number, email: string, password: string) => {
  const res = await axiosInstance.patch(`/users/${userId}/password`, { email, password });
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
};