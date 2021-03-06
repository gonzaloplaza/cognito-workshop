import * as dotenv from 'dotenv';

dotenv.config();

import PRODUCTION from './environments/pro';
import DEVELOPMENT from './environments/dev';
import TEST from './environments/test';

const { NODE_ENV } = process.env;

export type Configuration = {
  NODE_ENV: string;
  PORT: number;
  APP_NAME: string;
  APP_LOG_LEVEL: string;
  AWS: {
    ACCESS_KEY_ID: string;
    SECRET_ACCESS_KEY: string;
  };
  APP_COGNITO: {
    USER_POOL_ID: string;
    CLIENT_ID: string;
    REGION: string;
  };
};

let currentConfig: Configuration;

switch (NODE_ENV) {
  case 'production':
    currentConfig = PRODUCTION;
    break;
  case 'test':
    currentConfig = TEST;
    break;
  default:
    currentConfig = DEVELOPMENT;
}

export { currentConfig as config };
