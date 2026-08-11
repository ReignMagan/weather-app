import type { WeatherResponse } from '../types/weather';

import { isWeatherResponse } from '../utils/validate-weather-response';

import { apiRequest } from './api-client';
import { ApiError } from './api-error';
import { buildApiUrl } from './build-api-url';

type GetWeatherParams = {
  latitude: number;
  longitude: number;
};

export async function getWeather({
  latitude,
  longitude,
}: GetWeatherParams): Promise<WeatherResponse> {
  const url = buildApiUrl('/weather', {
    latitude,
    longitude,
  });

  const data = await apiRequest<unknown>(url);

  if (!isWeatherResponse(data)) {
    throw new ApiError('The weather server returned invalid data.', null, 'UNKNOWN');
  }

  return data;
}
