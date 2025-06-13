import { HttpError } from '@src/errors/HttpsError';
import Logging from '@src/log/logging';
import { Request, Response, NextFunction } from 'express';

function globalErrorHandlerMiddleware(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  Logging.error(`[${err.name}]:- Status = ${status} \n ${err.stack}`);

  res.status(status).send({
    status,
    message,
  });
}

export default globalErrorHandlerMiddleware;