import { describe, it, expect } from 'vitest';
import { buildServer } from '../src/server';

describe('health endpoint', () => {
  it('deve retornar status ok', async () => {
    const app = buildServer();
    const res = await app.inject({ method: 'GET', url: '/health' });
    expect(res.statusCode).toBe(200);
    const payload = res.json() as { status: string; dbConnected: boolean };
    expect(payload.status).toBe('ok');
    expect(typeof payload.dbConnected).toBe('boolean');
  });
});

