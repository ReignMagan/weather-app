import { API_BASE_URL } from '../constants/api';

type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined;

type QueryParams = Record<string, QueryValue>;

export function buildApiUrl(
  path: string,
  query?: QueryParams,
): string {
  const normalizedPath = path.startsWith('/')
    ? path
    : `/${path}`;

  const url = new URL(
    `${API_BASE_URL}${normalizedPath}`,
  );

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (
        value === null ||
        value === undefined
      ) {
        continue;
      }

      url.searchParams.set(
        key,
        String(value),
      );
    }
  }

  return url.toString();
}