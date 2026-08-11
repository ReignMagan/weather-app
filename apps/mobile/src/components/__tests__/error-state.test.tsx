import { fireEvent, render } from '@testing-library/react-native';

import { ErrorState } from '../error-state';

describe('ErrorState', () => {
  it('shows the provided error message', async () => {
    const { getByText } = await render(
      <ErrorState message="Unable to load weather." onRetry={jest.fn()} />,
    );

    expect(getByText('Unable to load weather.')).toBeTruthy();
  });

  it('calls onRetry when Try Again is pressed', async () => {
    const onRetry = jest.fn();

    const { getByText } = await render(
      <ErrorState message="Unable to load weather." onRetry={onRetry} />,
    );

    await fireEvent.press(getByText('Try Again'));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
