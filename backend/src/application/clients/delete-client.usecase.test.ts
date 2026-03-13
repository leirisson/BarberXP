import { describe, it, expect } from 'vitest';
import { DeleteClient } from '../clients/DeleteClient';

class InMemoryClientRepository {
  private items: Array<{ id: string; name: string; phone: string; address?: string; dateOfBirth?: Date }> = [];
  async findById(id: string) {
    return this.items.find((i) => i.id === id) ?? null;
  }
  async delete(id: string) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx >= 0) this.items.splice(idx, 1);
  }
}

describe('DeleteClient (UseCase)', () => {
  it('deve_remover_cliente_quando_id_existe', async () => {
    const repo = new InMemoryClientRepository();
    (repo as any)['items'].push({ id: '1', name: 'John', phone: '55999999999' });
    const usecase = new DeleteClient(repo as any);
    await usecase.execute({ id: '1' });
    expect(await repo.findById('1')).toBeNull();
  });

  it('deve_falhar_quando_id_inexistente', async () => {
    const repo = new InMemoryClientRepository();
    const usecase = new DeleteClient(repo as any);
    await expect(usecase.execute({ id: '999' })).rejects.toThrowError();
  });
});

