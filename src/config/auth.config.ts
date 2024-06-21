import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.AUTH_SECRET || 'NestProjectAuthSecretKey',
  expiration: process.env.AUTH_EXPIRATION || '86400s',
}));
