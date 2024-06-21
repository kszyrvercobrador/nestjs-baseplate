import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    mongodbUri: process.env.MONGODB_URI || 'DATABASE_URL=mongodb://localhost:27017/nest',
}));