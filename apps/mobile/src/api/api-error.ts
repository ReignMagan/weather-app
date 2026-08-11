export type ApiErrorCode = 'TIMEOUT' | 'NETWORK' | 'HTTP' | 'UNKNOWN';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number | null,
    public readonly code: ApiErrorCode,
  ) {
    super(message);

    this.name = 'ApiError';
  }
}
