import { describe, it, expect } from 'vitest';
import { ListClients } from '../clients/ListClients';
import { Client } from '@domain/clients/Client';

class InMemoryClientRepository {
  private items: Array<{ id: string; name: string; phone: string; address?: string; dateOfBirth?: Date }> = [];
  async list() {
    return this.items;
  }
}

describe('ListClients (UseCase)', () => {
  it('deve_listar_clientes', async () => {
    const repo = new InMemoryClientRepository();
    (repo as any)['items'].push({ id: '1', name: 'John', phone: '55999999999' });
    (repo as any)['items'].push({ id: '2', name: 'Jane', phone: '55998887777' });
    const usecase = new ListClients(repo as any);
    const result: Client[] = await usecase.execute();
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('John');
    expect(result[1].name).toBe('Jane');
  });
});

