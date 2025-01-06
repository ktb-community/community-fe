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
  writerId: string;
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