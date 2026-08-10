import type { WeatherCondition } from '../types/weather';

export function getWeatherIcon(condition: WeatherCondition): string {
  switch (condition) {
    case 'clear':
      return '☀️';

    case 'partly-cloudy':
      return '⛅';

    case 'cloudy':
      return '☁️';

    case 'fog':
      return '🌫️';

    case 'drizzle':
      return '🌦️';

    case 'rain':
      return '🌧️';

    case 'snow':
      return '❄️';

    case 'thunderstorm':
      return '⛈️';

    case 'unknown':
    default:
      return '🌤️';
  }
}