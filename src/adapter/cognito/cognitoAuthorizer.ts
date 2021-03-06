import { Request, Response, NextFunction } from 'express';
import { DomainError } from '@domain/error/domainError';
import { Configuration } from '@config';
import { CognitoJwtVerifier } from './cognitoJwtVerifier';
import { Authorizer } from '@domain/service/authorizer';
import { RequestHandler as Middleware } from 'express';

export class CognitoAuthorizer implements Authorizer<Request, Response, NextFunction> {
  private jwtVerifier: CognitoJwtVerifier;
  constructor(private config: Configuration) {
    try {
      this.jwtVerifier = new CognitoJwtVerifier(
        this.config.APP_COGNITO.USER_POOL_ID,
        this.config.APP_COGNITO.REGION
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public authorize: Middleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { authorization } = req.headers;

    const tokenArray = typeof authorization === 'string' ? authorization.split(' ') : [];
    const token = tokenArray[1];

    try {
      await this.jwtVerifier.verify(token).then((validation) => {
        if (!validation.isValid) {
          //Expired token
          return next(new DomainError(`Unauthorized: ${validation.error}`, 401));
        }

        //Adds cognito userId to request headers
        req.headers.user_id = validation.userName;

        return next();
      });
    } catch (err: any) {
      //res.status(401).json({ code: 401, message: `Unauthorized` });
      return next(new DomainError(`Unauthorized: ${err.message}`, 401));
    }
  };
}
