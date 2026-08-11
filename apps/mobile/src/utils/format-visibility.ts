export function formatVisibility(visibility: number, unit: string): string {
  if (unit === 'm') {
    if (visibility >= 1000) {
      return `${(visibility / 1000).toFixed(1)} km`;
    }

    return `${Math.round(visibility)} m`;
  }

  return `${visibility} ${unit}`;
}
