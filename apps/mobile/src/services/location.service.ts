import * as Location from 'expo-location';
import { Platform } from 'react-native';

import { env } from '../config/env';
import { validateCoordinates } from '../utils/validate-coordinates';

const CURRENT_LOCATION_TIMEOUT_MS = 8000;
const LAST_KNOWN_MAX_AGE_MS = 15 * 60 * 1000;
const LAST_KNOWN_REQUIRED_ACCURACY_METERS = 5000;

export class LocationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LocationError';
  }
}

export type DeviceCoordinates = {
  latitude: number;
  longitude: number;
};

export type LocationName = {
  city: string | null;
  province: string | null;
  region: string | null;
  country: string | null;
};

export async function getCurrentCoordinates(): Promise<DeviceCoordinates> {
  if (Platform.OS === 'web') {
    try {
      return await getWebCoordinates();
    } catch (error) {
      return configuredFallbackOrThrow(error);
    }
  }

  try {
    return await getNativeCoordinates();
  } catch (error) {
    return configuredFallbackOrThrow(error);
  }
}

async function getNativeCoordinates(): Promise<DeviceCoordinates> {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (permission.status !== Location.PermissionStatus.GRANTED) {
    throw new LocationError('Location permission was denied.');
  }

  const servicesEnabled = await Location.hasServicesEnabledAsync();

  if (!servicesEnabled) {
    throw new LocationError('Location services are disabled.');
  }

  await prepareAndroidLocationProvider();

  const lastKnownLocationPromise = Location.getLastKnownPositionAsync({
    maxAge: LAST_KNOWN_MAX_AGE_MS,
    requiredAccuracy: LAST_KNOWN_REQUIRED_ACCURACY_METERS,
  }).catch(() => null);

  try {
    const currentLocation = await getPositionWithFallbackAccuracy();

    return coordinatesFromLocation(currentLocation);
  } catch {
    const lastKnownLocation = await lastKnownLocationPromise;

    if (lastKnownLocation) {
      return coordinatesFromLocation(lastKnownLocation);
    }

    const anyLastKnownLocation = await Location.getLastKnownPositionAsync().catch(() => null);

    if (anyLastKnownLocation) {
      return coordinatesFromLocation(anyLastKnownLocation);
    }

    throw new LocationError(
      'Unable to obtain your current location. Make sure location is enabled and try again.',
    );
  }
}

function configuredFallbackOrThrow(error: unknown): DeviceCoordinates {
  if (env.fallbackLatitude !== null && env.fallbackLongitude !== null) {
    return validateCoordinates({
      latitude: env.fallbackLatitude,
      longitude: env.fallbackLongitude,
    });
  }

  if (error instanceof LocationError) {
    throw error;
  }

  throw new LocationError(
    'Unable to obtain your current location. Configure fallback coordinates and try again.',
  );
}

async function prepareAndroidLocationProvider(): Promise<void> {
  if (Platform.OS !== 'android') {
    return;
  }

  try {
    const provider = await Location.getProviderStatusAsync();

    if (!provider.networkAvailable) {
      await Location.enableNetworkProviderAsync();
    }
  } catch {
    // The system dialog may be unavailable or declined. Continue with the
    // providers that are already available and let normal fallbacks run.
  }
}

function getWebCoordinates(): Promise<DeviceCoordinates> {
  const browser = globalThis as typeof globalThis & {
    isSecureContext?: boolean;
    location?: { hostname?: string };
    navigator?: {
      geolocation?: {
        getCurrentPosition: (
          success: (position: { coords: { latitude: number; longitude: number } }) => void,
          failure: (error: { code: number; message: string }) => void,
          options: { enableHighAccuracy: boolean; timeout: number; maximumAge: number },
        ) => void;
      };
    };
  };

  if (browser.isSecureContext === false) {
    throw new LocationError(
      'Browser location requires HTTPS or localhost. Open this app at http://localhost:8081 and try again.',
    );
  }

  const geolocation = browser.navigator?.geolocation;

  if (!geolocation) {
    throw new LocationError('Location is not supported by this browser.');
  }

  return new Promise<DeviceCoordinates>((resolve, reject) => {
    geolocation.getCurrentPosition(
      (position) => {
        resolve(
          validateCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        );
      },
      (error) => {
        if (error.code === 1) {
          reject(
            new LocationError(
              'Location access is blocked for this site. Allow location in your browser site settings and try again.',
            ),
          );
          return;
        }

        if (error.code === 2) {
          reject(
            new LocationError(
              'Your browser could not determine a location. Check the operating-system location permission for your browser.',
            ),
          );
          return;
        }

        reject(
          new LocationError(
            'The browser location request timed out. Check your browser location permission and try again.',
          ),
        );
      },
      {
        enableHighAccuracy: false,
        timeout: CURRENT_LOCATION_TIMEOUT_MS,
        maximumAge: LAST_KNOWN_MAX_AGE_MS,
      },
    );
  });
}

async function getPositionWithFallbackAccuracy(): Promise<Location.LocationObject> {
  try {
    return await withTimeout(
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      }),
      CURRENT_LOCATION_TIMEOUT_MS,
    );
  } catch {
    // Network-based/low accuracy is significantly more reliable indoors and
    // on emulators that do not currently have a GPS-quality fix.
    return withTimeout(
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      }),
      CURRENT_LOCATION_TIMEOUT_MS,
    );
  }
}

function coordinatesFromLocation(location: Location.LocationObject): DeviceCoordinates {
  return validateCoordinates({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => {
          reject(new Error('Location request timed out.'));
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeout) {
      clearTimeout(timeout);
    }
  }
}

export async function reverseGeocodeCoordinates(
  coordinates: DeviceCoordinates,
): Promise<LocationName> {
  const results = await Location.reverseGeocodeAsync({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  });

  const location = results[0];

  if (!location) {
    return {
      city: null,
      province: null,
      region: null,
      country: null,
    };
  }

  return {
    city: location.city ?? location.district ?? null,

    province: location.subregion ?? null,

    region: location.region ?? null,

    country: location.country ?? null,
  };
}
