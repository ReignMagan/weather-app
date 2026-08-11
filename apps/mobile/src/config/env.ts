function requireEnv(
  name: string,
  value: string | undefined,
): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`,
    );
  }

  return value;
}

function validateApiBaseUrl(
  value: string,
): string {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(
      'EXPO_PUBLIC_API_BASE_URL must be a valid URL.',
    );
  }

  if (
    url.protocol !== 'http:' &&
    url.protocol !== 'https:'
  ) {
    throw new Error(
      'EXPO_PUBLIC_API_BASE_URL must use http or https.',
    );
  }

  return value.replace(/\/$/, '');
}

const apiBaseUrl = requireEnv(
  'EXPO_PUBLIC_API_BASE_URL',
  process.env.EXPO_PUBLIC_API_BASE_URL,
);

export const env = {
  apiBaseUrl: validateApiBaseUrl(
    apiBaseUrl,
  ),
} as const;