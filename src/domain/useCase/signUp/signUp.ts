import { Logger } from '@domain/service/logger';
import { UserRepository } from '@domain/repository/userRepository';

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};

export type SignUpResponse = {
  id: string;
  name: string;
  email: string;
  timestamp: number;
};

export class SignUp {
  constructor(private logger: Logger, private userRepository: UserRepository) {}

  public async invoke(signupRequest: SignUpRequest): Promise<SignUpResponse> {
    const signupResult = await this.userRepository.signUp(
      signupRequest.name,
      signupRequest.email,
      signupRequest.password
    );

    return {
      id: signupResult.id,
      name: signupResult.name,
      email: signupResult.email,
      timestamp: +new Date()
    };
  }
}
