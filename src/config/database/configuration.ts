import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('postgresql', () => ({
  host: process.env.POSTGRES_HOST,
  app_port: process.env.APP_PORT,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
}));
