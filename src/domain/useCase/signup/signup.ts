import { Logger } from '@domain/service/logger';

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type SignupResponse = [];

export class Signup {
  constructor(private logger: Logger) {}

  public async invoke(request: SignupRequest): Promise<SignupResponse> {
    this.logger.info(`User signup attempt with email: ${request.email}`);

    return [];
  }
}
