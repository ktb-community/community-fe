export interface ApiResponse<T> {
  message: string | null;
  status: string;
  data: T;
}

export interface ApiPageResponse<T> {
  message: string | null;
  status: string;
  data: T;
  hasMore: boolean;
  nextCursor: number;
}

export interface ErrorResponse {
  message: string;
  status: string;
}