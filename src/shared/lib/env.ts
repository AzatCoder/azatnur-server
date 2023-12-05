import { cleanEnv, num, str } from 'envalid';
import { config } from 'dotenv';

config();

export const env = cleanEnv(process.env, {
  PORT: num(),
  DB_NAME: str(),
  DB_USERNAME: str(),
  DB_PASSWORD: str(),
  DB_PORT: num(),
  DATABASE_URL: str(),
  TOKEN_SECRET: str(),
  TOKEN_EXPIRES_IN: str(),
  ADMIN_NAME: str(),
  ADMIN_PASSWORD: str(),
});
