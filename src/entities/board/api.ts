import { HttpStatusCode } from 'axios';
import axiosInstance from '@/shared/config/axios.ts';
import { ApiPageResponse, ApiResponse } from '@/shared/types/api.ts';
import {
  BoardComment,
  BoardCommentDeleteRequest,
  BoardCommentModifyRequest,
  BoardCommentsResponse,
  BoardDeleteRequest,
  BoardDetailResponse,
  BoardListResponse,
} from '@/entities/board/types.ts';

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

export const deleteBoard = async (boardDeleteRequest: BoardDeleteRequest) => {
  const { userId, boardId } = boardDeleteRequest;
  const res = await axiosInstance.delete(`/boards/${boardId}`, {
    data: { userId }
  });
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
}

export const checkBoardLike = async (boardId: number, userId: number) => {
  const res = await axiosInstance.get<ApiResponse<boolean>>(`/boards/${boardId}/likes/${userId}`);
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
}

export const toggleBoardLike = async (boardId: number, userId: number) => {
  const res = await axiosInstance.post<ApiResponse<boolean>>(`/boards/${boardId}/likes/${userId}`);
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
}

export const countBoardView = async (boardId: number) => {
  const res = await axiosInstance.post<ApiResponse<null>>(`/boards/${boardId}/views`);
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
}

export const getBoardComments = async (boardId: number, offset: number, limit: number = 10) => {
  const res = await axiosInstance.get<ApiPageResponse<BoardCommentsResponse>>(`/boards/${boardId}/comments?limit=${limit}&offset=${offset}`);
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
};

export const addBoardComment = async (boardId: number, userId: number, content: string) => {
  const res = await axiosInstance.post<ApiResponse<BoardComment>>(`/boards/${boardId}/comments`, { userId, content })
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
}

export const modifyBoardComment = async (boardCommentModifyRequest: BoardCommentModifyRequest) => {
  const { boardId, userId, commentId, comment } = boardCommentModifyRequest;
  const res = await axiosInstance.patch<ApiResponse<null>>(`/boards/${boardId}/comments`, { userId, commentId, comment });
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
}

export const deleteBoardComment = async (boardCommentDeleteRequest: BoardCommentDeleteRequest) => {
  const { boardId, userId, commentId } = boardCommentDeleteRequest;
  const res = await axiosInstance.delete<ApiResponse<null>>(`/boards/${boardId}/comments`, {
    data: { userId, commentId }
  });
  if (res.status === HttpStatusCode.Ok) return res.data;
  throw new Error(res.data?.message || 'Unknown error');
}