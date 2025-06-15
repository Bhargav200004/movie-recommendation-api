import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

import Logging from '@/log/logging';
import ApiResponse from '@/library/globalApiResponse';

function globalErrorHandlerMiddleware(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  const response = new ApiResponse(false, message, {}, status);

  Logging.error(`[${err.name}]:- Status = ${status} \n ${err.stack}`);
  res.status(status).json(response);
}

export default globalErrorHandlerMiddleware;