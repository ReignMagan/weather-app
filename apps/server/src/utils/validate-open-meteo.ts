import type { OpenMeteoResponse } from '../types/open-meteo';

export function validateOpenMeteoResponse(data: OpenMeteoResponse): OpenMeteoResponse {
  if (!data) {
    throw new Error('Open-Meteo returned an empty response');
  }

  if (!data.current) {
    throw new Error('Open-Meteo response is missing current weather data');
  }

  if (!data.hourly || !Array.isArray(data.hourly.time)) {
    throw new Error('Open-Meteo response is missing hourly weather data');
  }

  if (!data.daily || !Array.isArray(data.daily.time)) {
    throw new Error('Open-Meteo response is missing daily weather data');
  }

  if (!data.timezone) {
    throw new Error('Open-Meteo response is missing timezone data');
  }

  return data;
}
