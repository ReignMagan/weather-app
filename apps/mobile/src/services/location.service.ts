import * as Location from 'expo-location';

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
  const permission =
    await Location.requestForegroundPermissionsAsync();

  if (
    permission.status !==
    Location.PermissionStatus.GRANTED
  ) {
    throw new Error('Location permission was denied.');
  }

  const servicesEnabled =
    await Location.hasServicesEnabledAsync();

  if (!servicesEnabled) {
    throw new Error('Location services are disabled.');
  }

  const lastKnownLocation =
    await Location.getLastKnownPositionAsync();

  if (lastKnownLocation) {
    return {
      latitude: lastKnownLocation.coords.latitude,
      longitude: lastKnownLocation.coords.longitude,
    };
  }

  return new Promise<DeviceCoordinates>((resolve, reject) => {
    let subscription: Location.LocationSubscription | null = null;
    let settled = false;

    const cleanup = () => {
      subscription?.remove();
    };

    const timeout = setTimeout(() => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();

      reject(
        new Error(
          'Unable to obtain your current location. Please try again.',
        ),
      );
    }, 15000);

    void Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 1000,
        distanceInterval: 0,
      },
      (position) => {
        if (settled) {
          return;
        }

        settled = true;

        clearTimeout(timeout);
        cleanup();

        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
    )
      .then((locationSubscription) => {
        subscription = locationSubscription;

        if (settled) {
          subscription.remove();
        }
      })
      .catch((error: unknown) => {
        if (settled) {
          return;
        }

        settled = true;

        clearTimeout(timeout);
        cleanup();

        reject(
          error instanceof Error
            ? error
            : new Error(
                'Unable to obtain your current location.',
              ),
        );
      });
  });
}

export async function reverseGeocodeCoordinates(
  coordinates: DeviceCoordinates,
): Promise<LocationName> {
  const results =
    await Location.reverseGeocodeAsync({
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
    city:
      location.city ??
      location.district ??
      null,

    province:
      location.subregion ??
      null,

    region:
      location.region ??
      null,

    country:
      location.country ??
      null,
  };
}