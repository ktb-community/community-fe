import { HttpStatusCode } from 'axios';
import axiosInstance from '@/shared/config/axios.ts';
import { ApiPageResponse, ApiResponse } from '@/shared/types/api.ts';
import { BoardCommentsResponse, BoardDetailResponse, BoardListResponse } from '@/entities/board/types.ts';

export const getBoardList = async (offset: number, limit: number = 10) => {
  const res = await axiosInstance.get<ApiPageResponse<BoardListResponse>>(`/boards?limit=${limit}&offset=${offset}`);
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
};

export const getBoard = async (boardId: number) => {
  const res = await axiosInstance.get<ApiResponse<BoardDetailResponse>>(`/boards/${boardId}`);
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
};

export const getBoardComments = async (boardId: number, offset: number, limit: number = 10) => {
  const res = await axiosInstance.get<ApiPageResponse<BoardCommentsResponse>>(`/boards/${boardId}/comments?limit=${limit}&offset=${offset}`);
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
};