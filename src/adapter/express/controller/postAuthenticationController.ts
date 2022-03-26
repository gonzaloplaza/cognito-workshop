import { NextFunction, Request, Response } from 'express';
import { DomainError } from '@domain/error/domainError';
import { Authentication } from '@domain/useCase';

export class PostAuthenticationController {
  constructor(private authentication: Authentication) {}

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const authenticationResponse = await this.authentication.invoke({
        email: req.body.email,
        password: req.body.password
      });
      res.setHeader('Authorization', 'Bearer ' + authenticationResponse.accessToken);
      res.status(200).json(authenticationResponse);
    } catch (e) {
      next(new DomainError('Invalid authentication', 401));
    }
  }
}
