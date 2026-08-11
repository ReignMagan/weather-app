export function formatVisibility(
  visibility: number,
  unit: string,
): string {
  if (unit === 'm') {
    if (visibility >= 1000) {
      return `${(visibility / 1000).toFixed(1)} km`;
    }

    return `${Math.round(visibility)} m`;
  }

  return `${visibility} ${unit}`;
}

export function getVisibilityLabel(
  visibility: number,
  unit: string,
): string {
  const visibilityInMeters =
    unit === 'km'
      ? visibility * 1000
      : visibility;

  if (visibilityInMeters < 1000) {
    return 'Poor';
  }

  if (visibilityInMeters < 5000) {
    return 'Moderate';
  }

  if (visibilityInMeters < 10000) {
    return 'Good';
  }

  return 'Excellent';
}