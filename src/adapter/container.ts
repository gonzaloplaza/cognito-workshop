import {
  asClass,
  createContainer,
  asFunction,
  InjectionMode,
  AwilixContainer,
  asValue
} from 'awilix';
import { Server } from './server';
import { Router } from './router';

//Import injectables from api bounded context
import * as apiControllers from '@adapter/express/controller';
import * as validators from '@adapter/express/validator';
import * as useCases from '@domain/useCase';

//Shared infrastructure implementations
import { ErrorMiddleware } from '@adapter/express/middleware/errorMiddleware';
import { ApiRouter } from '@adapter/express/router';
import { ServerLogger } from '@adapter/logger';
import { config } from '@config';
import { CognitoAuthorizer, CognitoClient, CognitoUserRepository } from '@adapter/cognito';

export class Container {
  readonly container: AwilixContainer;

  constructor() {
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC
    });

    this.register();
  }

  public register(): void {
    this.container
      .register({
        //core components
        server: asClass(Server).singleton(),
        config: asValue(config),
        router: asFunction(Router).singleton(),
        logger: asClass(ServerLogger).singleton()
      })
      .register({
        errorMiddleware: asClass(ErrorMiddleware).singleton(),
        apiRouter: asFunction(ApiRouter).singleton()
      })
      .register({
        cognitoClient: asClass(CognitoClient).singleton(),
        authorizer: asClass(CognitoAuthorizer).singleton(),
        userRepository: asClass(CognitoUserRepository).singleton()
      })
      .register({
        indexController: asClass(apiControllers.GetIndexController).singleton()
      })
      .register({
        postSignupController: asClass(apiControllers.PostSignupController).singleton(),
        postSignupValidator: asClass(validators.PostSignupValidator).singleton(),
        signup: asClass(useCases.SignUp)
      })
      .register({
        postAuthenticationController: asClass(
          apiControllers.PostAuthenticationController
        ).singleton(),
        postAuthenticationValidator: asClass(validators.PostAuthenticationValidator).singleton(),
        authentication: asClass(useCases.Authentication).singleton()
      })
      .register({
        getProfileController: asClass(apiControllers.GetProfileController).singleton(),
        obtainProfile: asClass(useCases.ObtainProfile).singleton()
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}
