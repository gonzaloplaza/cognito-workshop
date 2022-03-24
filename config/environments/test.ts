import { Configuration } from '@config';

const DEV: Configuration = {
  NODE_ENV: 'test',
  PORT: +(process.env.PORT || 3000),
  APP_NAME: process.env.APP_NAME || 'cognito-workshop',
  APP_LOG_LEVEL: process.env.APP_LOG_LEVEL || 'debug',
  APP_COGNITO: {
    USER_POOL_ID: process.env.COGNITO_USER_POOL || '',
    CLIENT_ID: process.env.COGNITO_CLIENT_ID || '',
    REGION: process.env.COGNITO_REGION || ''
  }
};

export default DEV;
