export function getRainChanceLabel(probability: number): string {
  if (probability < 20) {
    return 'Low';
  }

  if (probability < 50) {
    return 'Moderate';
  }

  if (probability < 80) {
    return 'High';
  }

  return 'Very High';
}