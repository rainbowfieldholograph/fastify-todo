import { FastifyPluginAsync } from 'fastify';
import { getStatus } from './health-check.controller';

const healthCheckRoute: FastifyPluginAsync = async (server, options) => {
  server.get('/healthcheck', getStatus);
};

export { healthCheckRoute };
