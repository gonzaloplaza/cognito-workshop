import { Signup } from '@domain/useCase';
import { NextFunction, Request, Response } from 'express';
import { DomainError } from '@domain/error/domainError';
import { SignupResponse } from '@domain/useCase/signup/signup';

export class PostSignupController {
  constructor(private signup: Signup) {}

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const signupResponse: SignupResponse = await this.signup.invoke({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      res.status(200).json(signupResponse);
    } catch (e) {
      next(new DomainError('Invalid signup', 401));
    }
  }
}
