export function formatPressure(pressure: number, unit: string): string {
  return `${Math.round(pressure)} ${unit}`;
}
