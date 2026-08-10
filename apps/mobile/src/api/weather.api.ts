import type { WeatherResponse } from '../types/weather';
import { API_BASE_URL } from '../constants/api';
import { ApiError } from './api-error';

type GetWeatherParams = {
  latitude: number;
  longitude: number;
};

type ApiErrorResponse = {
  error?: string;
  message?: string;
};

export async function getWeather({
  latitude,
  longitude,
}: GetWeatherParams): Promise<WeatherResponse> {
  const url = new URL(`${API_BASE_URL}/weather`);

  url.searchParams.set('latitude', latitude.toString());
  url.searchParams.set('longitude', longitude.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    let message = `Weather request failed with status ${response.status}`;

    try {
      const errorResponse = (await response.json()) as ApiErrorResponse;

      if (errorResponse.message) {
        message = errorResponse.message;
      }
    } catch {
      // Keep the fallback HTTP error message.
    }

    throw new ApiError(message, response.status);
  }

  return (await response.json()) as WeatherResponse;
}