import { getStatus } from './health-check.controller.js';

const healthCheckRoute = async (server, options) => {
  server.get('/healthcheck', getStatus);
};

export { healthCheckRoute };
