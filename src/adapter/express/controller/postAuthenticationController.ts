import { NextFunction, Request, Response } from 'express';
import { DomainError } from '@domain/error/domainError';
import {
  Authentication,
  AuthenticationResponse
} from '@domain/useCase/authentication/authentication';

export class PostAuthenticationController {
  constructor(private authentication: Authentication) {}

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const authenticationResponse: AuthenticationResponse = await this.authentication.invoke({
        username: req.body.username,
        password: req.body.password
      });
      res.setHeader('Authorization', 'Bearer ' + authenticationResponse.accessToken);
      res.status(200).json(authenticationResponse);
    } catch (e) {
      next(new DomainError('Invalid authentication', 401));
    }
  }
}
