import type { WeatherCondition } from '@weather-app/shared';

export function getWeatherCondition(code: number): WeatherCondition {
  if (code === 0) {
    return 'clear';
  }

  if (code === 1 || code === 2) {
    return 'partly-cloudy';
  }

  if (code === 3) {
    return 'cloudy';
  }

  if (code === 45 || code === 48) {
    return 'fog';
  }

  if (code >= 51 && code <= 57) {
    return 'drizzle';
  }

  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return 'rain';
  }

  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return 'snow';
  }

  if (code >= 95 && code <= 99) {
    return 'thunderstorm';
  }

  return 'unknown';
}

export function getWeatherConditionLabel(condition: WeatherCondition): string {
  switch (condition) {
    case 'clear':
      return 'Clear';

    case 'partly-cloudy':
      return 'Partly Cloudy';

    case 'cloudy':
      return 'Cloudy';

    case 'fog':
      return 'Fog';

    case 'drizzle':
      return 'Drizzle';

    case 'rain':
      return 'Rain';

    case 'snow':
      return 'Snow';

    case 'thunderstorm':
      return 'Thunderstorm';

    case 'unknown':
    default:
      return 'Unknown';
  }
}
