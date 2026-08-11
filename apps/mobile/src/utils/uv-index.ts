export function getUvIndexLabel(uvIndex: number): string {
  if (uvIndex < 3) {
    return 'Low';
  }

  if (uvIndex < 6) {
    return 'Moderate';
  }

  if (uvIndex < 8) {
    return 'High';
  }

  if (uvIndex < 11) {
    return 'Very High';
  }

  return 'Extreme';
}