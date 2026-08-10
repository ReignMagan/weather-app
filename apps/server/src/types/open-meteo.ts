export interface OpenMeteoCurrentWeather {
  time: string;
  is_day: number;  
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
  weather_code: number;
  surface_pressure: number;
  visibility: number;
  precipitation: number;
  rain: number;
}

export interface OpenMeteoDailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_probability_max: number[];
  precipitation_sum: number[];
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: OpenMeteoCurrentWeather;
  hourly: OpenMeteoHourlyWeather;
  daily: OpenMeteoDailyWeather;
}

export interface OpenMeteoHourlyWeather {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
  relative_humidity_2m: number[];
  wind_speed_10m: number[];
}