export interface ApiMessageResponse {
  message: string;
}

export interface ApiHealthResponse {
  status: 'ok';
  message: string;
}

export interface ApiErrorResponse {
  error: string;
  message: string;
}