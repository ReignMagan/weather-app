const STALE_AFTER_MS = 30 * 60 * 1000;

export function isWeatherStale(generatedAt: string): boolean {
  const generatedTime = new Date(generatedAt).getTime();

  if (Number.isNaN(generatedTime)) {
    return true;
  }

  return Date.now() - generatedTime > STALE_AFTER_MS;
}
