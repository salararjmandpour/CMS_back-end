import * as process from 'process';
import { ConfigService } from '@nestjs/config';

export interface Configs {
  PORT: string;
  NODE_ENV: string;
  MONGO_URI: string;
  REDIS_URL: string;
  IPPANEL_API_KEY: string;
  IPPANEL_BASE_URL: string;
  IPPANEL_PATTERN: string;
  ACCESS_TOKEN_SECRET_KEY: string;
  REFRESH_TOKEN_SECRET_KEY: string;
  ACCESS_TOKEN_EXPIRES: string;
  REFRESH_TOKEN_EXPIRES: string;
  EMAIL_HOST: string;
  EMAIL_PORT: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;
}

export default (): Configs => ({
  PORT: process.env.PORT,
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

  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
});

export const configService: ConfigService<Configs> =
  new ConfigService<Configs>();
