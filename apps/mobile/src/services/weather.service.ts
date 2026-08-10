import { getWeather } from '../api/weather.api';

type GetWeatherParams = {
  latitude: number;
  longitude: number;
};

export async function fetchWeather(params: GetWeatherParams) {
  return getWeather(params);
}