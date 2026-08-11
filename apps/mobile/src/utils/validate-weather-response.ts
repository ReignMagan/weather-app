import type { WeatherResponse } from '../types/weather';

export function isWeatherResponse(value: unknown): value is WeatherResponse {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const weather = value as Partial<WeatherResponse>;

  if (
    !weather.location ||
    !weather.current ||
    !Array.isArray(weather.hourly) ||
    !Array.isArray(weather.daily) ||
    !weather.units ||
    typeof weather.timezone !== 'string' ||
    typeof weather.generatedAt !== 'string'
  ) {
    return false;
  }

  if (
    typeof weather.current.temperature !== 'number' ||
    typeof weather.current.apparentTemperature !== 'number' ||
    typeof weather.current.humidity !== 'number' ||
    typeof weather.current.windSpeed !== 'number' ||
    typeof weather.current.weatherCode !== 'number' ||
    typeof weather.current.condition !== 'string' ||
    typeof weather.current.conditionLabel !== 'string'
  ) {
    return false;
  }

  return true;
}
