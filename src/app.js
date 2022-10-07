import { buildServer } from './server.js';

const server = await buildServer({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
    },
  },
});

const start = async () => {
  try {
    const port = parseInt(process.env.PORT);
    await server.listen({ port });
  } catch (error) {
    server.log.error(error.message);
    process.exit();
  }
};

start();
