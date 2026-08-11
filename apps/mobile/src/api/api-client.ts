import { ApiError } from './api-error';

type ApiErrorResponse = {
  error?: string;
  message?: string;
};

type ApiRequestOptions = RequestInit & {
  timeoutMs?: number;
};

const DEFAULT_TIMEOUT_MS = 10000;

export async function apiRequest<T>(
  url: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    ...requestOptions
  } = options;

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      ...requestOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      let message =
        `Request failed with status ${response.status}`;

      try {
        const errorResponse =
          (await response.json()) as ApiErrorResponse;

        if (errorResponse.message) {
          message = errorResponse.message;
        }
      } catch {
        // Keep fallback message.
      }

      throw new ApiError(
        message,
        response.status,
        'HTTP',
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (
      error instanceof Error &&
      error.name === 'AbortError'
    ) {
      throw new ApiError(
        'The request timed out. Please try again.',
        408,
        'TIMEOUT',
      );
    }

    if (error instanceof TypeError) {
      throw new ApiError(
        'Unable to connect to the server. Check your internet connection and try again.',
        null,
        'NETWORK',
      );
    }

    throw new ApiError(
      'Something went wrong while communicating with the server.',
      null,
      'UNKNOWN',
    );
  } finally {
    clearTimeout(timeout);
  }
}