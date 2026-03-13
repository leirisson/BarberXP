import { describe, it, expect } from 'vitest';
import { CreateClient } from '@application/clients/CreateClient';

class InMemoryClientRepository {
  private items: Array<{ id: string; name: string; phone: string }> = [];

  async findByPhone(phone: string) {
    return this.items.find((i) => i.phone === phone) ?? null;
  }

  async save(client: { id: string; name: string; phone: string }) {
    this.items.push(client);
  }
}

describe('CreateClient (UseCase)', () => {
  it('deve_falhar_quando_telefone_duplicado', async () => {
    const repo = new InMemoryClientRepository();
    repo['items'].push({ id: '1', name: 'Jane', phone: '55998887777' });
    const usecase = new CreateClient(repo as any);

    await expect(
      usecase.execute({ name: 'John', phone: '55998887777' })
    ).rejects.toThrowError();
  });

  it('deve_criar_cliente_quando_telefone_unico', async () => {
    const repo = new InMemoryClientRepository();
    const usecase = new CreateClient(repo as any);

    const result = await usecase.execute({ name: 'John', phone: '55999999999' });
    expect(result.name).toBe('John');
    expect(result.phone.value).toBe('55999999999');
  });
});

