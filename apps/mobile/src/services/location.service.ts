import * as Location from 'expo-location';

export type DeviceCoordinates = {
  latitude: number;
  longitude: number;
};

export async function getCurrentCoordinates(): Promise<DeviceCoordinates> {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (permission.status !== Location.PermissionStatus.GRANTED) {
    throw new Error('Location permission was denied.');
  }

  const servicesEnabled = await Location.hasServicesEnabledAsync();

  if (!servicesEnabled) {
    throw new Error('Location services are disabled.');
  }

  const lastKnownLocation = await Location.getLastKnownPositionAsync();

  if (lastKnownLocation) {
    return {
      latitude: lastKnownLocation.coords.latitude,
      longitude: lastKnownLocation.coords.longitude,
    };
  }

  return new Promise<DeviceCoordinates>((resolve, reject) => {
    let subscription: Location.LocationSubscription | null = null;

    const timeout = setTimeout(() => {
      subscription?.remove();

      reject(
        new Error(
          'Unable to obtain your current location. Try moving near a window or outdoors and try again.',
        ),
      );
    }, 15000);

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 1000,
        distanceInterval: 0,
      },
      (position) => {
        clearTimeout(timeout);

        subscription?.remove();

        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
    )
      .then((locationSubscription) => {
        subscription = locationSubscription;
      })
      .catch((error: unknown) => {
        clearTimeout(timeout);

        reject(
          error instanceof Error
            ? error
            : new Error('Unable to obtain your current location.'),
        );
      });
  });
}