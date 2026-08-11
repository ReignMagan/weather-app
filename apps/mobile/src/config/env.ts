import { Platform } from 'react-native';

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function validateApiBaseUrl(value: string): string {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error('EXPO_PUBLIC_API_BASE_URL must be a valid URL.');
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('EXPO_PUBLIC_API_BASE_URL must use http or https.');
  }

  return value.replace(/\/$/, '');
}

export function resolveApiBaseUrl(value: string): string {
  const validatedValue = validateApiBaseUrl(value);

  if (Platform.OS !== 'web') {
    return validatedValue;
  }

  const browserLocation = (
    globalThis as typeof globalThis & {
      location?: { hostname?: string };
    }
  ).location;

  if (!browserLocation?.hostname) {
    return validatedValue;
  }

  const url = new URL(validatedValue);
  url.hostname = browserLocation.hostname;

  return url.toString().replace(/\/$/, '');
}

function optionalCoordinate(value: string | undefined): number | null {
  if (!value?.trim()) {
    return null;
  }

  const coordinate = Number(value);
  return Number.isFinite(coordinate) ? coordinate : null;
}

const apiBaseUrl = requireEnv('EXPO_PUBLIC_API_BASE_URL', process.env.EXPO_PUBLIC_API_BASE_URL);

export const env = {
  apiBaseUrl: resolveApiBaseUrl(apiBaseUrl),
  fallbackLatitude: optionalCoordinate(process.env.EXPO_PUBLIC_FALLBACK_LATITUDE),
  fallbackLongitude: optionalCoordinate(process.env.EXPO_PUBLIC_FALLBACK_LONGITUDE),
} as const;
