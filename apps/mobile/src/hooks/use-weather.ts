import { useCallback, useEffect, useRef, useState } from 'react';

import type { WeatherResponse } from '../types/weather';

import {
  getCurrentCoordinates,
  reverseGeocodeCoordinates,
  type DeviceCoordinates,
  type LocationName,
} from '../services/location.service';

import { loadLocationName, saveLocationName } from '../services/location-cache.service';

import { loadWeather as loadCachedWeather, saveWeather } from '../services/weather-cache.service';

import { fetchWeather } from '../services/weather.service';
import { ApiError } from '../api/api-error';
import { logger } from '../utils/logger';

type UseWeatherResult = {
  weather: WeatherResponse | null;
  locationName: LocationName | null;
  loading: boolean;
  error: string | null;
  usingCachedWeather: boolean;
  refresh: () => Promise<void>;
};

function hasLocationChangedEnough(
  previous: DeviceCoordinates | null,
  current: DeviceCoordinates,
): boolean {
  if (!previous) {
    return true;
  }

  const latitudeDifference = Math.abs(previous.latitude - current.latitude);

  const longitudeDifference = Math.abs(previous.longitude - current.longitude);

  return latitudeDifference >= 0.01 || longitudeDifference >= 0.01;
}

export function useWeather(): UseWeatherResult {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const [locationName, setLocationName] = useState<LocationName | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [usingCachedWeather, setUsingCachedWeather] = useState(false);

  const lastGeocodedCoordinates = useRef<DeviceCoordinates | null>(null);

  const loadFreshWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const coordinates = await getCurrentCoordinates();

      const weatherData = await fetchWeather(coordinates);

      setWeather(weatherData);

      logger.debug('Weather loaded successfully.', {
        generatedAt: weatherData.generatedAt,
        timezone: weatherData.timezone,
      });

      setUsingCachedWeather(false);

      await saveWeather(weatherData);

      if (hasLocationChangedEnough(lastGeocodedCoordinates.current, coordinates)) {
        try {
          const readableLocation = await reverseGeocodeCoordinates(coordinates);

          setLocationName(readableLocation);

          await saveLocationName(readableLocation);

          lastGeocodedCoordinates.current = coordinates;
        } catch (error) {
          logger.warn('Reverse geocoding failed.', error);

          // Keep previous readable location.
        }
      }
    } catch (error) {
      logger.error('Weather loading failed.', error);

      if (error instanceof ApiError) {
        setError(error.message);

        return;
      }

      setError(error instanceof Error ? error.message : 'Unable to load weather.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function initialize() {
      const [cachedWeather, cachedLocation] = await Promise.all([
        loadCachedWeather(),
        loadLocationName(),
      ]);

      if (cachedWeather) {
        setWeather(cachedWeather);
        setUsingCachedWeather(true);
      }

      if (cachedLocation) {
        setLocationName(cachedLocation);
      }

      await loadFreshWeather();
    }

    void initialize();
  }, [loadFreshWeather]);

  return {
    weather,
    locationName,
    loading,
    error,
    usingCachedWeather,
    refresh: loadFreshWeather,
  };
}
