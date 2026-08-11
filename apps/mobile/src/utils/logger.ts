const isDevelopment = __DEV__;

export const logger = {
  debug(message: string, ...details: unknown[]): void {
    if (!isDevelopment) {
      return;
    }

    console.log(`[DEBUG] ${message}`, ...details);
  },

  info(message: string, ...details: unknown[]): void {
    if (!isDevelopment) {
      return;
    }

    console.info(`[INFO] ${message}`, ...details);
  },

  warn(message: string, ...details: unknown[]): void {
    if (!isDevelopment) {
      return;
    }

    console.warn(`[WARN] ${message}`, ...details);
  },

  error(message: string, error?: unknown): void {
    if (!isDevelopment) {
      return;
    }

    console.error(`[ERROR] ${message}`, error);
  },
} as const;
