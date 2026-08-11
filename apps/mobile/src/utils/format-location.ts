import type { LocationName } from '../services/location.service';

export function formatLocationName(location: LocationName | null): string {
  if (!location) {
    return 'Current Location';
  }

  if (location.city && location.province) {
    return `${location.city}, ${location.province}`;
  }

  if (location.city) {
    return location.city;
  }

  if (location.province) {
    return location.province;
  }

  if (location.region) {
    return location.region;
  }

  if (location.country) {
    return location.country;
  }

  return 'Current Location';
}
