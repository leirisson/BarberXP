export const env = {
  port: Number(process.env.PORT ?? 3334),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  databaseUrl: process.env.DATABASE_URL ?? '',
};

