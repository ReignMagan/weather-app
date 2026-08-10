import { Router } from 'express';

import healthRouter from './health.routes';
import weatherRouter from './weather.routes';
import type { ApiMessageResponse } from '@weather-app/shared';

const router = Router();

    router.get('/', (_req, res) => {
    const response: ApiMessageResponse = {
        message: 'Weather App API is running',
    };

    res.json(response);
    });

router.use('/health', healthRouter);

router.use('/weather', weatherRouter);

export default router;