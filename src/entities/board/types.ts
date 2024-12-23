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