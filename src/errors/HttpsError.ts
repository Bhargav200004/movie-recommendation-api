class HttpError extends Error {
  status: number;
  message: string;
  stack?: string | undefined;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status || 500;
    this.message = message;
  }
}

class NotFound extends HttpError {
  status: number;
  message: string;
  stack?: string | undefined;
  constructor(message: string) {
    super(message);
    this.status = 404;
    this.message = message;
  }
}

export { HttpError, NotFound };
