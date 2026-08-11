import type { DeviceCoordinates } from '../services/location.service';

export function validateCoordinates(
  coordinates: DeviceCoordinates,
): DeviceCoordinates {
  const { latitude, longitude } = coordinates;

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    throw new Error(
      'Location coordinates are invalid.',
    );
  }

  if (
    latitude < -90 ||
    latitude > 90
  ) {
    throw new Error(
      'Latitude must be between -90 and 90.',
    );
  }

  if (
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error(
      'Longitude must be between -180 and 180.',
    );
  }

  return coordinates;
}