import { NextFunction, Request, Response } from 'express';
import { ObtainProfile } from '@domain/useCase';
import { DomainError } from '@domain/error/domainError';

export class GetProfileController {
  constructor(private obtainProfile: ObtainProfile) {}

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    if (!req.headers.user_id) {
      throw new DomainError('Cannot retrieve user', 400);
    }

    try {
      res.status(200).json(await this.obtainProfile.invoke(req.headers.user_id.toString()));
    } catch (e: any) {
      next(new DomainError(`Error obtaining user: ${e.message}`, 400));
    }
  }
}
