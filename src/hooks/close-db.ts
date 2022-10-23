import { onCloseAsyncHookHandler } from 'fastify';
import mongoose from 'mongoose';

const closeDb: onCloseAsyncHookHandler = async function () {
  await mongoose.connection.close();
};

export { closeDb };
