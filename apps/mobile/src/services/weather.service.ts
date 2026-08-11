import { getWeather } from '../api/weather.api';
import { validateCoordinates } from '../utils/validate-coordinates';

type GetWeatherParams = {
  latitude: number;
  longitude: number;
};

export async function fetchWeather(
  params: GetWeatherParams,
) {
  const coordinates =
    validateCoordinates(params);

  return getWeather(coordinates);
}