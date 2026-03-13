import 'dotenv/config';
import { buildServer } from './server';
import { env } from '@shared/env';
import { getPrisma } from '@infrastructure/prismaClient';

async function start() {
  try {
    try {
      const prisma = await getPrisma();
      if (prisma) {
        await prisma.$connect();
        console.log('Conexão com banco estabelecida.');
      } else {
        throw new Error('Prisma Client não disponível');
      }
      console.log('Conexão com banco estabelecida.');
    } catch (e) {
      console.warn(
        'Não foi possível conectar ao banco. A API iniciará mesmo assim.',
        e instanceof Error ? e.message : e
      );
    }
    const app = buildServer();
    const address = await app.listen({ port: env.port, host: '0.0.0.0' });
    app.log.info(`API disponível em ${address}`);
  } catch (err) {
    console.error('Erro ao iniciar servidor:', err);
    process.exit(1);
  }
}

start();
