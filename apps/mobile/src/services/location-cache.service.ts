import AsyncStorage from '@react-native-async-storage/async-storage';

import type { LocationName } from './location.service';
import { logger } from '../utils/logger';

const LOCATION_NAME_KEY =
  '@weather-app/location-name';

export async function saveLocationName(
  locationName: LocationName,
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      LOCATION_NAME_KEY,
      JSON.stringify(locationName),
    );
  } catch (error) {
    logger.warn(
      'Unable to save location cache.',
      error,
    );
  }
}

export async function loadLocationName(): Promise<LocationName | null> {
  try {
    const storedValue =
      await AsyncStorage.getItem(
        LOCATION_NAME_KEY,
      );

    if (!storedValue) {
      return null;
    }

    try {
      return JSON.parse(
        storedValue,
      ) as LocationName;
    } catch {
      await removeLocationName();

      return null;
    }
  } catch (error) {
    logger.warn(
      'Unable to load location cache.',
      error,
    );

    return null;
  }
}

async function removeLocationName(): Promise<void> {
  try {
    await AsyncStorage.removeItem(
      LOCATION_NAME_KEY,
    );
  } catch (error) {
    logger.warn(
      'Unable to remove location cache.',
      error,
    );
  }
}