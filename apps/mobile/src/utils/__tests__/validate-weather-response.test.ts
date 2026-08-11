import { isWeatherResponse } from '../validate-weather-response';

describe('isWeatherResponse', () => {
  const validWeather = {
    location: {
      name: 'Current Location',
      latitude: 10.65,
      longitude: 122.96,
    },

    timezone: 'Asia/Manila',

    generatedAt:
      '2026-08-10T08:00:00.000Z',

    units: {
      temperature: '°C',
      humidity: '%',
      windSpeed: 'km/h',
      pressure: 'hPa',
      visibility: 'm',
      precipitation: 'mm',
    },

    current: {
      time: '2026-08-10T16:00',
      isDay: true,
      temperature: 30,
      apparentTemperature: 33,
      humidity: 70,
      windSpeed: 12,
      windDirection: 180,
      windGusts: 20,
      weatherCode: 1,
      condition: 'partly-cloudy',
      conditionLabel: 'Partly Cloudy',
      pressure: 1010,
      visibility: 10000,
      precipitation: 0,
      rain: 0,
    },

    hourly: [],

    daily: [],
  };

  it('accepts a valid weather response', () => {
    expect(
      isWeatherResponse(validWeather),
    ).toBe(true);
  });

  it('rejects null', () => {
    expect(
      isWeatherResponse(null),
    ).toBe(false);
  });

  it('rejects missing current weather', () => {
    const invalidWeather = {
      ...validWeather,
      current: undefined,
    };

    expect(
      isWeatherResponse(invalidWeather),
    ).toBe(false);
  });

  it('rejects invalid hourly data', () => {
    const invalidWeather = {
      ...validWeather,
      hourly: null,
    };

    expect(
      isWeatherResponse(invalidWeather),
    ).toBe(false);
  });

  it('rejects invalid temperature', () => {
    const invalidWeather = {
      ...validWeather,
      current: {
        ...validWeather.current,
        temperature: '30',
      },
    };

    expect(
      isWeatherResponse(invalidWeather),
    ).toBe(false);
  });
});