import fastify from 'fastify';
import { checkDbAlive } from '@infrastructure/prismaClient';

export function buildServer() {
  const app = fastify({ logger: true });

  app.get('/health', async () => {
    const dbConnected = await checkDbAlive();
    return { status: 'ok', dbConnected };
  });

  return app;
}

