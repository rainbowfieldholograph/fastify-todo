import mongoose from 'mongoose';
import { config } from 'dotenv';
import { buildServer } from './server.js';

config();

const server = buildServer();

const start = async () => {
  try {
    mongoose.connection.on('connected', () => {
      server.log.info('MongoDB connected');
    });
    mongoose.connection.on('disconnected', () => {
      server.log.error('MongoDB disconnected');
    });

    const dbUrl = process.env.MONGODB_URL;
    const port = parseInt(process.env.PORT);

    await server.listen({ port });

    mongoose.connect(dbUrl);
  } catch (error) {
    server.log.error(error.message);
    process.exit();
  }
};

start();
