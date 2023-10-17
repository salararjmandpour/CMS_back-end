import * as process from 'process';
import { ConfigService } from '@nestjs/config';

export interface Configs {
  PORT: string;
  HOST: string;
  NODE_ENV: string;
  MONGO_URI: string;
  REDIS_URL: string;

  IPPANEL_API_KEY: string;
  IPPANEL_BASE_URL: string;
  IPPANEL_PATTERN: string;
  IPPANEL_NEW_PASSWORD_PATTERN: string;

  ACCESS_TOKEN_SECRET_KEY: string;
  REFRESH_TOKEN_SECRET_KEY: string;
  ACCESS_TOKEN_EXPIRES: string;
  REFRESH_TOKEN_EXPIRES: string;

  EMAIL_HOST: string;
  EMAIL_PORT: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;

  GOOGLE_OAUTH_CLIENT_ID: string;
  GOOGLE_OAUTH_CLIENT_SECRET: string;
  GOOGLE_OAUTH_REDIRECT_URL: string;

  CRYPTO_SECRET_KEY: string;
}

export default (): Configs => ({
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  NODE_ENV: process.env.NODE_ENV,

  MONGO_URI: process.env.MONGO_URI,
  REDIS_URL: process.env.REDIS_URL,

  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES,

  IPPANEL_API_KEY: process.env.IPPANEL_API_KEY,
  IPPANEL_BASE_URL: process.env.IPPANEL_BASE_URL,
  IPPANEL_PATTERN: process.env.IPPANEL_PATTERN,
  IPPANEL_NEW_PASSWORD_PATTERN: process.env.IPPANEL_NEW_PASSWORD_PATTERN,

  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URL: process.env.GOOGLE_OAUTH_REDIRECT_URL,

  CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
});

export const configService: ConfigService<Configs> =
  new ConfigService<Configs>();
