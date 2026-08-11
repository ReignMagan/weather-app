import type { OpenMeteoResponse } from '../types/open-meteo';
import { validateOpenMeteoResponse } from '../utils/validate-open-meteo';

import { env } from '../config/env';

export async function fetchOpenMeteoWeather(
  latitude: number,
  longitude: number,
): Promise<OpenMeteoResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),

    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
      'weather_code',
      'surface_pressure',
      'visibility',
      'precipitation',
      'rain',
      'is_day',
    ].join(','),

    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'weather_code',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_probability_max',
      'precipitation_sum',
    ].join(','),

    hourly: [
      'temperature_2m',
      'weather_code',
      'precipitation_probability',
      'relative_humidity_2m',
      'wind_speed_10m',
    ].join(','),

    forecast_days: '7',

    timezone: 'auto',
  });

  const response = await fetch(`${env.openMeteoBaseUrl}/forecast?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Open-Meteo request failed with status ${response.status}`);
  }

  const data = (await response.json()) as OpenMeteoResponse;

  return validateOpenMeteoResponse(data);
}
