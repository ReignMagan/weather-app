import { isWeatherStale } from '../weather-staleness';

describe('isWeatherStale', () => {
  beforeEach(() => {
    jest.useFakeTimers();

    jest.setSystemTime(new Date('2026-08-10T08:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns false for recent weather', () => {
    expect(isWeatherStale('2026-08-10T07:45:00.000Z')).toBe(false);
  });

  it('returns true for weather older than 30 minutes', () => {
    expect(isWeatherStale('2026-08-10T07:00:00.000Z')).toBe(true);
  });

  it('returns true for invalid timestamps', () => {
    expect(isWeatherStale('invalid-date')).toBe(true);
  });
});
