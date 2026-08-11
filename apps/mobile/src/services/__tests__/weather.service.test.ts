import { getWeather } from '../../api/weather.api';
import { fetchWeather } from '../weather.service';

jest.mock('../../api/weather.api', () => ({
  getWeather: jest.fn(),
}));

const mockedGetWeather = getWeather as jest.MockedFunction<typeof getWeather>;

describe('fetchWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('passes valid coordinates to getWeather', async () => {
    const response = {
      location: {
        name: 'Current Location',
        latitude: 10.65,
        longitude: 122.96,
      },
      timezone: 'Asia/Manila',
      generatedAt: '2026-08-10T08:00:00.000Z',
      units: {},
      current: {},
      hourly: [],
      daily: [],
    };

    mockedGetWeather.mockResolvedValue(response as never);

    await fetchWeather({
      latitude: 10.65,
      longitude: 122.96,
    });

    expect(mockedGetWeather).toHaveBeenCalledWith({
      latitude: 10.65,
      longitude: 122.96,
    });
  });

  it('rejects invalid coordinates before calling the API', async () => {
    await expect(
      fetchWeather({
        latitude: 100,
        longitude: 122,
      }),
    ).rejects.toThrow();

    expect(mockedGetWeather).not.toHaveBeenCalled();
  });
});
