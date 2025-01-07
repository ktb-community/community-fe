export interface Board {
  boardId: number;
  title: string;
  createdAt: string;
  viewCnt: number;
  likeCnt: number;
  commentCnt: number;
  writerNickname: string;
  writerProfileImg: string;
}

export type BoardListResponse = Board[]

export interface BoardDetailResponse extends Board {
  content: string;
  boardImg: string;
  writerId: number;
}

export interface BoardComment {
  commentId: number;
  content: string;
  createdAt: string;
  writerId: number;
  writerNickname: string;
  writerProfileImg: string;
}

export type BoardCommentsResponse = BoardComment[]

export interface BoardAddRequest {
  userId: number;
  title: string;
  content: string;
  file: File | null;
}

export interface BoardModifyRequest {
  boardId: number;
  formData: FormData;
}

export interface BoardDeleteRequest {
  boardId: number;
  userId: number;
}

export interface BoardCommentModifyRequest {
  commentId: number;
  userId: number;
  boardId: number;
  comment: string;
}

export interface BoardCommentDeleteRequest {
  userId: number;
  boardId: number;
  commentId: number;
}