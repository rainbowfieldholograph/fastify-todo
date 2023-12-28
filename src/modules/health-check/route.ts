import { FastifyPluginAsync } from 'fastify';
import { getStatus } from './controller';

const healthCheckRoute: FastifyPluginAsync = async (server, _options) => {
  server.get('/healthcheck', getStatus);
};

export { healthCheckRoute };
