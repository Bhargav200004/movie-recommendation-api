import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import globalErrorHandler from '@/middleware/globalErrorHandler.middleware';
import Logging from '@/log/logging';
import { NotFound } from '@/errors/HttpsError';

jest.mock('@/log/logging', () => ({
  error: jest.fn(),
}));

describe('globalErrorHandlerMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();

    jest.clearAllMocks();
  });

  it('should send error response when no status and message', () => {
    const error = new Error();

    globalErrorHandler(error as HttpError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Something went wrong',
      data: {},
      errorcode: 500,
    });
  });

  it('should send error response when Not Found', () => {
    const error = new NotFound('Customer Not Found');

    globalErrorHandler(
      error as HttpError,
      req as Request,
      res as Response,
      next,
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Customer Not Found',
      data: {},
      errorcode: 404,
    });
  });

  it('should log error with correct format', () => {
    const error = new NotFound('Not Found');

    globalErrorHandler(
      error as HttpError,
      req as Request,
      res as Response,
      next,
    );

    expect(Logging.error).toHaveBeenCalledWith(
      expect.stringContaining('[Error]:- Status = 404'),
    );
  });
});
