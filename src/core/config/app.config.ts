import * as process from 'process';
import { ConfigService } from '@nestjs/config';

export interface Configs {
  PORT: string;
  NODE_ENV: string;
  MONGO_URI: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES: string;
  IPPANEL_API_KEY: string;
  IPPANEL_BASE_URL: string;
}

export default (): Configs => ({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,

  MONGO_URI: process.env.MONGO_URI,
  REDIS_URL: process.env.REDIS_URL,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES,

  IPPANEL_API_KEY: process.env.IPPANEL_API_KEY,
  IPPANEL_BASE_URL: process.env.IPPANEL_BASE_URL,
});

export const configService: ConfigService<Configs> =
  new ConfigService<Configs>();
