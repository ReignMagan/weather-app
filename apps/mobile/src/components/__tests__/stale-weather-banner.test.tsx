import { render } from '@testing-library/react-native';

import { StaleWeatherBanner } from '../stale-weather-banner';

describe('StaleWeatherBanner', () => {
  it('tells the user older weather data is being shown', async () => {
    const { getByText } = await render(
      <StaleWeatherBanner />,
    );

    expect(
      getByText(
        'Showing older weather data',
      ),
    ).toBeTruthy();

    expect(
      getByText(
        'Updating with the latest forecast…',
      ),
    ).toBeTruthy();
  });
});