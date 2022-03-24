import { Authenticator } from '@domain/service/authenticator';
import { Logger } from '@domain/service/logger';

export type AuthenticationRequest = {
  username: string;
  password: string;
};

export type AuthenticationResponse = {
  accessToken: string;
  expiresIn: number;
};

export class Authentication {
  constructor(private logger: Logger, private authenticator: Authenticator) {}

  public async invoke(request: AuthenticationRequest): Promise<AuthenticationResponse> {
    this.logger.info(`User authentication attempt with username: ${request.username}`);

    return await this.authenticator.auth(request);
  }
}
