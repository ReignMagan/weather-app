export function getWindDirectionLabel(degrees: number): string {
  const normalized = ((degrees % 360) + 360) % 360;

  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;

  const index = Math.round(normalized / 45) % directions.length;

  return directions[index];
}
