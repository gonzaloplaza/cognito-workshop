import {
  AuthenticationRequest,
  AuthenticationResponse
} from '@domain/useCase/authentication/authentication';

export interface Authenticator {
  auth(t: AuthenticationRequest): Promise<AuthenticationResponse>;
}
