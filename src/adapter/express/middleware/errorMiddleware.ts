import { NextFunction, Request, Response } from 'express';
import { DomainError } from '@domain/error/domainError';
import { Logger } from '@domain/service/logger';

export class ErrorMiddleware {
  private defaultHttpErrorCode = 500;

  constructor(private logger: Logger) {}

  public routeNotFoundErrorHandler = (req: Request, res: Response): void => {
    res.status(404).send({ error: 404, message: 'Route not found' });
  };

  public clientErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (!res.headersSent) {
      next(err);
    }
  };

  public customErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (err instanceof DomainError) {
      this.logger.error(err.message);
      const { statusCode, message } = err;
      res.status(statusCode).json({
        status: statusCode,
        message: message
      });
    } else {
      next(err);
    }
  };

  public globalErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ): Response => {
    console.log(err.message);
    return res.status(this.defaultHttpErrorCode).json({
      message: 'Something wrong happened :`(',
      status: this.defaultHttpErrorCode
    });
  };
}
