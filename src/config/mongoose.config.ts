import type { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongoUri = process.env.MONGO_URI || '';
export const mongooseConfig: MongooseModuleOptions = {
  dbName: process.env.MONGO_DB_NAME,
  auth: {
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
  },
};
