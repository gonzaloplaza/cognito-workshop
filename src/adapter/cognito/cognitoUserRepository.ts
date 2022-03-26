import { UserRepository } from '@domain/repository/userRepository';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool
} from 'amazon-cognito-identity-js';
import { CognitoClient } from '@adapter/cognito';
import { AuthenticationResponse } from '@domain/useCase/authentication/authentication';
import { User } from '@domain/model/user';

export class CognitoUserRepository implements UserRepository {
  private readonly cognitoUserPool: CognitoUserPool;

  constructor(private cognitoClient: CognitoClient) {
    this.cognitoUserPool = this.cognitoClient.initCognitoUserPool();
  }

  public async auth(email: string, password: string): Promise<AuthenticationResponse> {
    const user = new CognitoUser({ Username: email, Pool: this.cognitoUserPool });
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) => {
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) =>
          user.getUserData(() => {
            resolve({
              accessToken: result.getAccessToken().getJwtToken().toString(),
              expiresIn:
                result.getAccessToken().getExpiration() - result.getAccessToken().getIssuedAt()
            });
          }),
        onFailure: reject,
        newPasswordRequired: resolve
      });
    });
  }

  public async signUp(name: string, email: string, password: string): Promise<User> {
    const attributeEmail = new CognitoUserAttribute({ Name: 'email', Value: email });
    const attributeName = new CognitoUserAttribute({ Name: 'name', Value: name });

    return new Promise((resolve, reject) =>
      this.cognitoUserPool.signUp(
        email,
        password,
        [attributeEmail, attributeName],
        [],
        (err, result) => {
          if (err || !result) {
            reject(err);
            return;
          }

          resolve(this.getUserById(result.userSub));
        }
      )
    );
  }

  public async getUserById(userId: string): Promise<User> {
    return this.cognitoClient.getUser(userId).then((cognitoUser) => {
      return {
        id: cognitoUser.UserAttributes?.find((a) => a.Name === 'sub')?.Value ?? '',
        name: cognitoUser.UserAttributes?.find((a) => a.Name === 'name')?.Value ?? '',
        email: cognitoUser.UserAttributes?.find((a) => a.Name === 'email')?.Value ?? ''
      };
    });
  }
}
