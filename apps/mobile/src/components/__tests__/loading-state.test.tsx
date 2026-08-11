import { render } from '@testing-library/react-native';

import { LoadingState } from '../loading-state';

describe('LoadingState', () => {
  it('shows the provided loading message', async () => {
    const { getByText } = await render(
      <LoadingState
        message="Loading weather..."
      />,
    );

    expect(
      getByText('Loading weather...'),
    ).toBeTruthy();
  });
});