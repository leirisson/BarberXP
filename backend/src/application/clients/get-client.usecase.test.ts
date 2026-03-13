import { describe, it, expect } from 'vitest';
import { GetClient } from '@application/clients/GetClient';
import { Client } from '@domain/clients/Client';

class InMemoryClientRepository {
  private items: Array<{ id: string; name: string; phone: string; address?: string; dateOfBirth?: Date }> = [];
  async findById(id: string) {
    return this.items.find((i) => i.id === id) ?? null;
  }
}

describe('GetClient (UseCase)', () => {
  it('deve_retornar_cliente_quando_id_existe', async () => {
    const repo = new InMemoryClientRepository();
    (repo as any)['items'].push({ id: '1', name: 'Jane', phone: '55998887777' });
    const usecase = new GetClient(repo as any);
    const result: Client = await usecase.execute({ id: '1' });
    expect(result.name).toBe('Jane');
    expect(result.phone.value).toBe('55998887777');
  });

  it('deve_falhar_quando_id_inexistente', async () => {
    const repo = new InMemoryClientRepository();
    const usecase = new GetClient(repo as any);
    await expect(usecase.execute({ id: '999' })).rejects.toThrowError();
  });
});

