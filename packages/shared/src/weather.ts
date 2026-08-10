export interface WeatherLocation {
  name: string;
  latitude: number;
  longitude: number;
}

export type WeatherCondition =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunderstorm'
  | 'unknown';

export interface CurrentWeather {
  time: string;
  isDay: boolean;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  weatherCode: number;
  condition: WeatherCondition;
  conditionLabel: string;
  pressure: number;
  visibility: number;
  precipitation: number;
  rain: number;
}

export interface DailyWeather {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  weatherCode: number;
  condition: WeatherCondition;
  conditionLabel: string;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipitationProbabilityMax: number;
  precipitationSum: number;
}

export interface WeatherResponse {
  location: WeatherLocation;
  timezone: string;
  generatedAt: string;
  units: WeatherUnits;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

export interface HourlyWeather {
  time: string;
  temperature: number;
  weatherCode: number;
  condition: WeatherCondition;
  conditionLabel: string;
  precipitationProbability: number;
  humidity: number;
  windSpeed: number;
}

export interface WeatherUnits {
  temperature: '°C';
  windSpeed: 'km/h';
  precipitation: 'mm';
  pressure: 'hPa';
  visibility: 'm';
  humidity: '%';
  precipitationProbability: '%';
  uvIndex: 'index';
}