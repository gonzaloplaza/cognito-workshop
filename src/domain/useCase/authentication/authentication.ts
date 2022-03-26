import { UserRepository } from '@domain/repository/userRepository';

export type AuthenticationRequest = {
  email: string;
  password: string;
};

export type AuthenticationResponse = {
  accessToken: string;
  expiresIn: number;
};

export class Authentication {
  constructor(private userRepository: UserRepository) {}

  public async invoke(request: AuthenticationRequest): Promise<AuthenticationResponse> {
    return await this.userRepository.auth(request.email, request.password);
  }
}
