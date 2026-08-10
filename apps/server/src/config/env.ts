import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

export const env = {
  port: Number(process.env.PORT) || 3100,
  openMeteoBaseUrl:
    process.env.OPEN_METEO_BASE_URL ?? 'https://api.open-meteo.com/v1',
};