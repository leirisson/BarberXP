import { env } from '@shared/env';

let prismaInstance: any | null = null;

export async function getPrisma() {
  if (prismaInstance) return prismaInstance;
  try {
    const { PrismaClient } = await import('@prisma/client');
    prismaInstance = new PrismaClient({
      datasources: {
        db: {
          url: env.databaseUrl || process.env.DATABASE_URL,
        },
      },
    });
    return prismaInstance;
  } catch {
    return null;
  }
}

export async function checkDbAlive(): Promise<boolean> {
  const client = await getPrisma();
  if (!client) return false;
  try {
    await client.$connect();
    await client.$disconnect();
    return true;
  } catch {
    return false;
  }
}

