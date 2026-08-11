import AsyncStorage from '@react-native-async-storage/async-storage';

import type { WeatherResponse } from '../types/weather';
import { logger } from '../utils/logger';
import { isWeatherResponse } from '../utils/validate-weather-response';
const WEATHER_CACHE_KEY = '@weather-app/weather';

const MAX_CACHE_AGE_MS = 24 * 60 * 60 * 1000;

type WeatherCache = {
  savedAt: number;
  weather: WeatherResponse;
};

export async function saveWeather(weather: WeatherResponse): Promise<void> {
  try {
    const cache: WeatherCache = {
      savedAt: Date.now(),
      weather,
    };

    await AsyncStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    logger.warn('Unable to save weather cache.', error);
  }
}

export async function loadWeather(): Promise<WeatherResponse | null> {
  try {
    const storedValue = await AsyncStorage.getItem(WEATHER_CACHE_KEY);

    if (!storedValue) {
      return null;
    }

    let cache: WeatherCache;

    try {
      cache = JSON.parse(storedValue) as WeatherCache;
    } catch {
      await removeWeatherCache();

      return null;
    }

    if (!cache.savedAt || !isWeatherResponse(cache.weather)) {
      await removeWeatherCache();

      return null;
    }

    const cacheAge = Date.now() - cache.savedAt;

    if (cacheAge > MAX_CACHE_AGE_MS) {
      await removeWeatherCache();

      return null;
    }

    return cache.weather;
  } catch (error) {
    logger.warn('Unable to load weather cache.', error);

    return null;
  }
}

async function removeWeatherCache(): Promise<void> {
  try {
    await AsyncStorage.removeItem(WEATHER_CACHE_KEY);
  } catch (error) {
    logger.warn('Unable to remove weather cache.', error);
  }
}
