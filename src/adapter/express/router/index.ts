import { Request, Response, NextFunction, Router } from 'express';
import { Authorizer } from '@domain/service/authorizer';
import * as controllers from '@adapter/express/controller';
import * as validators from '@adapter/express/validator';

export const ApiRouter = (
  indexController: controllers.GetIndexController,
  getProfileController: controllers.GetProfileController,
  postAuthenticationController: controllers.PostAuthenticationController,
  postAuthenticationValidator: validators.PostAuthenticationValidator,
  authorizer: Authorizer<Request, Response, NextFunction>
): Router => {
  const apiRouter = Router();

  apiRouter.get('/', indexController.invoke.bind(indexController));
  apiRouter.post(
    '/auth',
    postAuthenticationValidator.validate,
    postAuthenticationController.invoke.bind(postAuthenticationController)
  );

  // authenticated routes
  const v1Router = Router();
  v1Router.get('/profile', getProfileController.invoke.bind(getProfileController));

  // All routes under /api/v1 requires cognito jwt authorization
  apiRouter.use('/v1', authorizer.authorize, v1Router);

  return apiRouter;
};
