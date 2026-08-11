export function getWindSpeedLabel(windSpeed: number): string {
  if (windSpeed < 5) {
    return 'Calm';
  }

  if (windSpeed < 20) {
    return 'Breezy';
  }

  if (windSpeed < 40) {
    return 'Windy';
  }

  return 'Strong';
}