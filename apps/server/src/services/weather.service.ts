import type { WeatherResponse } from '@weather-app/shared';

import { fetchOpenMeteoWeather } from '../clients/open-meteo.client';

import { getWeatherCondition, getWeatherConditionLabel } from '../utils/weather-condition';

export async function getWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
  const data = await fetchOpenMeteoWeather(latitude, longitude);

  const currentCondition = getWeatherCondition(data.current.weather_code);

  return {
    location: {
      name: 'Current Location',
      latitude: data.latitude,
      longitude: data.longitude,
    },

    timezone: data.timezone,

    generatedAt: new Date().toISOString(),

    units: {
      temperature: '°C',
      windSpeed: 'km/h',
      precipitation: 'mm',
      pressure: 'hPa',
      visibility: 'm',
      humidity: '%',
      precipitationProbability: '%',
      uvIndex: 'index',
    },

    current: {
      time: data.current.time,
      isDay: data.current.is_day === 1,
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      windGusts: data.current.wind_gusts_10m,
      weatherCode: data.current.weather_code,
      condition: currentCondition,
      conditionLabel: getWeatherConditionLabel(currentCondition),
      pressure: data.current.surface_pressure,
      visibility: data.current.visibility,
      precipitation: data.current.precipitation,
      rain: data.current.rain,
    },

    hourly: data.hourly.time.map((time, index) => {
      const weatherCode = data.hourly.weather_code[index] ?? 0;
      const condition = getWeatherCondition(weatherCode);

      return {
        time,
        temperature: data.hourly.temperature_2m[index] ?? 0,
        weatherCode,
        condition,
        conditionLabel: getWeatherConditionLabel(condition),
        precipitationProbability: data.hourly.precipitation_probability[index] ?? 0,
        humidity: data.hourly.relative_humidity_2m[index] ?? 0,
        windSpeed: data.hourly.wind_speed_10m[index] ?? 0,
      };
    }),

    daily: data.daily.time.map((date, index) => {
      const weatherCode = data.daily.weather_code[index] ?? 0;
      const condition = getWeatherCondition(weatherCode);

      return {
        date,
        temperatureMax: data.daily.temperature_2m_max[index] ?? 0,
        temperatureMin: data.daily.temperature_2m_min[index] ?? 0,
        weatherCode,
        condition,
        conditionLabel: getWeatherConditionLabel(condition),
        sunrise: data.daily.sunrise[index] ?? '',
        sunset: data.daily.sunset[index] ?? '',
        uvIndexMax: data.daily.uv_index_max[index] ?? 0,
        precipitationProbabilityMax: data.daily.precipitation_probability_max[index] ?? 0,
        precipitationSum: data.daily.precipitation_sum[index] ?? 0,
      };
    }),
  };
}
