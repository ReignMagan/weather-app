export function getPrecipitationLabel(amount: number): string {
  if (amount <= 0) {
    return 'None';
  }

  if (amount < 2.5) {
    return 'Light';
  }

  if (amount < 7.5) {
    return 'Moderate';
  }

  if (amount < 15) {
    return 'Heavy';
  }

  return 'Very Heavy';
}