import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  // Express requires four parameters to recognize error-handling middleware.
  void _next;

  console.error(error);

  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server',
  });
};
