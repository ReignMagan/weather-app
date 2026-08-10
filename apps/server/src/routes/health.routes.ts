import { Router } from 'express';

const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Weather App API is healthy',
  });
});

export default healthRouter;