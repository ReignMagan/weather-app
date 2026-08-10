import express from 'express';

import { errorHandler } from './middleware/error.middleware';
import apiRouter from './routes';

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use((_req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
  });
});


app.use(errorHandler);

export default app;