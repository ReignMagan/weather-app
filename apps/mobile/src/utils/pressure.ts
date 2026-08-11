export function formatPressure(
  pressure: number,
  unit: string,
): string {
  return `${Math.round(pressure)} ${unit}`;
}

export function getPressureLabel(pressure: number): string {
  if (pressure < 1000) {
    return 'Low';
  }

  if (pressure > 1020) {
    return 'High';
  }

  return 'Normal';
}