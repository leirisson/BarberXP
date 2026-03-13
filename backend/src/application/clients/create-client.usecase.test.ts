import { describe, it, expect } from 'vitest';
import { CreateClient } from '@application/clients/CreateClient';

class InMemoryClientRepository {
  private items: Array<{ id: string; name: string; phone: string; address?: string; dateOfBirth?: Date }> = [];

  async findByPhone(phone: string) {
    return this.items.find((i) => i.phone === phone) ?? null;
  }

  async save(client: { id?: string; name: string; phone: string; address?: string; dateOfBirth?: Date }) {
    this.items.push({
      id: client.id ?? String(this.items.length + 1),
      name: client.name,
      phone: client.phone,
      address: client.address,
      dateOfBirth: client.dateOfBirth,
    });
  }
}

describe('CreateClient (UseCase)', () => {
  it('deve_falhar_quando_telefone_duplicado', async () => {
    const repo = new InMemoryClientRepository();
    await repo.save({ id: '1', name: 'Jane', phone: '55998887777' });
    const usecase = new CreateClient(repo as any);

    await expect(
      usecase.execute({ name: 'John', phone: '55998887777' })
    ).rejects.toThrowError();
  });

  it('deve_criar_cliente_quando_telefone_unico', async () => {
    const repo = new InMemoryClientRepository();
    const usecase = new CreateClient(repo as any);

    const result = await usecase.execute({ name: 'John', phone: '55999999999', address: 'Rua A', dateOfBirth: new Date(2000, 0, 1) });
    expect(result.name).toBe('John');
    expect(result.phone.value).toBe('55999999999');
    expect(result.address).toBe('Rua A');
    expect(result.dateOfBirth?.getFullYear()).toBe(2000);
  });
});
