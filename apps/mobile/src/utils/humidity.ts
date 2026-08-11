export function getHumidityLabel(humidity: number): string {
  if (humidity < 30) {
    return 'Dry';
  }

  if (humidity < 60) {
    return 'Comfortable';
  }

  if (humidity < 80) {
    return 'Humid';
  }

  return 'Very Humid';
}