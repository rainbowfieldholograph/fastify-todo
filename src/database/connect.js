import mongoose from 'mongoose';

const connect = (server) => {
  mongoose.connection.on('connected', () => {
    server.log.info('MongoDB connected');
  });

  mongoose.connection.on('disconnected', () => {
    server.log.error('MongoDB disconnected');
  });

  const dbUrl = process.env.MONGODB_URL;
  mongoose.connect(dbUrl);
};

export { connect };
