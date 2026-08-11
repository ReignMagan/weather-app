import {
  fireEvent,
  render,
} from '@testing-library/react-native';

import { RefreshErrorBanner } from '../refresh-error-banner';

describe('RefreshErrorBanner', () => {
  it('shows the refresh error message', async () => {
    const { getByText } = await render(
      <RefreshErrorBanner
        message="Unable to refresh weather."
        onRetry={jest.fn()}
      />,
    );

    expect(
      getByText(
        'Unable to refresh weather.',
      ),
    ).toBeTruthy();
  });

  it('calls onRetry when Retry is pressed', async () => {
    const onRetry = jest.fn();

    const { getByText } = await render(
      <RefreshErrorBanner
        message="Unable to refresh weather."
        onRetry={onRetry}
      />,
    );

    await fireEvent.press(
      getByText('Retry'),
    );

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});