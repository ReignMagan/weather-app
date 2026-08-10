import { useCallback, useEffect, useState } from 'react';

import type { WeatherResponse } from '../types/weather';
import { getCurrentCoordinates } from '../services/location.service';
import { fetchWeather } from '../services/weather.service';

type UseWeatherResult = {
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export function useWeather(): UseWeatherResult {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const coordinates = await getCurrentCoordinates();
      const weatherData = await fetchWeather(coordinates);

      setWeather(weatherData);
    } catch (error) {
      setWeather(null);

      setError(
        error instanceof Error
          ? error.message
          : 'Unable to load weather.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadWeather();
  }, [loadWeather]);

  return {
    weather,
    loading,
    error,
    refresh: loadWeather,
  };
}