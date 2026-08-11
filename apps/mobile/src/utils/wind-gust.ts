export function getWindGustLabel(windGusts: number): string {
  if (windGusts < 20) {
    return 'Light';
  }

  if (windGusts < 40) {
    return 'Moderate';
  }

  if (windGusts < 60) {
    return 'Strong';
  }

  return 'Very Strong';
}