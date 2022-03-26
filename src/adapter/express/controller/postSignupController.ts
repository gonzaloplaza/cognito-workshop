import { SignUp } from '@domain/useCase';
import { NextFunction, Request, Response } from 'express';
import { DomainError } from '@domain/error/domainError';

export class PostSignupController {
  constructor(private signup: SignUp) {}

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const signupResponse = await this.signup.invoke({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      res.status(200).json(signupResponse);
    } catch (e) {
      next(new DomainError('Invalid signUp', 401));
    }
  }
}
