import { HttpStatusCode } from 'axios';
import axiosInstance from '@/shared/config/axios.ts';
import { ApiPageResponse } from '@/shared/types/api.ts';
import { BoardListResponse } from '@/entities/board/types.ts';

export const getBoardList = async (offset: number, limit: number = 10) => {
  const res = await axiosInstance.get<ApiPageResponse<BoardListResponse>>(`/boards?limit=${limit}&offset=${offset}`);
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
};