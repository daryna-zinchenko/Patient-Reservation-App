/* eslint-disable max-len */
import express, { ErrorRequestHandler } from 'express';
type Req = express.Request;
type Res = express.Response;
type Next = express.NextFunction;

export const tryCatch: ErrorRequestHandler = (err, _req: Req, res: Res, _next: Next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
};
