import { FastifyInstance } from 'fastify';
import mongoose from 'mongoose';

export const connectDatabase = async (server: FastifyInstance) => {
  mongoose.connection.on('connected', () => {
    server.log.info('MongoDB connected');
  });

  mongoose.connection.on('disconnected', () => {
    server.log.error('MongoDB disconnected');
  });

  const dbUrl = process.env.MONGODB_URL;

  await mongoose.connect(dbUrl!);
};
