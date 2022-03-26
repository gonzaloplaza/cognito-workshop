import { User } from '@domain/model/user';
import { AuthenticationResponse } from '@domain/useCase/authentication/authentication';

export interface UserRepository {
  auth(email: string, password: string): Promise<AuthenticationResponse>;
  signUp(name: string, email: string, password: string): Promise<User>;
  getUserById(userId: string): Promise<User>;
}
