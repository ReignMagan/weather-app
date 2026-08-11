import { Router } from 'express';

import { getWeather } from '../services/weather.service';

const router = Router();

router.get('/', async (req, res) => {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Valid latitude and longitude are required',
    });
  }

  const weather = await getWeather(latitude, longitude);

  res.json(weather);
});

export default router;
