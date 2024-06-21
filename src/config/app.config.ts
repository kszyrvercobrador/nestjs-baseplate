import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    name: process.env.APP_NAME || 'NestProject',
}));