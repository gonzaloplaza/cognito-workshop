import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Configuration } from '@config';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AdminGetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export class CognitoClient {
  private client: CognitoIdentityServiceProvider;

  constructor(private config: Configuration) {
    this.client = new CognitoIdentityServiceProvider({
      region: this.config.APP_COGNITO.REGION
    });
  }

  public initCognitoUserPool(): CognitoUserPool {
    try {
      return new CognitoUserPool({
        UserPoolId: this.config.APP_COGNITO.USER_POOL_ID,
        ClientId: this.config.APP_COGNITO.CLIENT_ID
      });
    } catch (e) {
      console.error('Error: Invalid or required AWS Cognito UserPool and ClientID');
      process.exit(1);
    }
  }

  public async getUser(userId: string): Promise<AdminGetUserResponse> {
    return await this.client
      .adminGetUser({ UserPoolId: this.config.APP_COGNITO.USER_POOL_ID, Username: userId })
      .promise();
  }
}
