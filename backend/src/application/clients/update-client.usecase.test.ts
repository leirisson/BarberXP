import { describe, it, expect } from 'vitest';
import { UpdateClient } from '@application/clients/UpdateClient';
import { Client } from '@domain/clients/Client';

class InMemoryClientRepository {
  private items: Array<{ id: string; name: string; phone: string; address?: string; dateOfBirth?: Date }> = [];
  async findById(id: string) {
    return this.items.find((i) => i.id === id) ?? null;
  }
  async findByPhone(phone: string) {
    return this.items.find((i) => i.phone === phone) ?? null;
  }
  async update(client: { id: string; name: string; phone: string; address?: string; dateOfBirth?: Date }) {
    const idx = this.items.findIndex((i) => i.id === client.id);
    if (idx >= 0) this.items[idx] = client;
  }
}

describe('UpdateClient (UseCase)', () => {
  it('deve_atualizar_nome_e_endereco_quando_dados_validos', async () => {
    const repo = new InMemoryClientRepository();
    (repo as any)['items'].push({ id: '1', name: 'John', phone: '55999999999' });
    const usecase = new UpdateClient(repo as any);
    const result: Client = await usecase.execute({ id: '1', name: 'John Updated', address: 'Rua Nova' });
    expect(result.name).toBe('John Updated');
    expect(result.address).toBe('Rua Nova');
    expect(result.phone.value).toBe('55999999999');
  });

  it('deve_falhar_quando_tentar_alterar_telefone_para_duplicado', async () => {
    const repo = new InMemoryClientRepository();
    (repo as any)['items'].push({ id: '1', name: 'John', phone: '55999999999' });
    (repo as any)['items'].push({ id: '2', name: 'Jane', phone: '55998887777' });
    const usecase = new UpdateClient(repo as any);
    await expect(
      usecase.execute({ id: '1', phone: '55998887777' })
    ).rejects.toThrowError();
  });

  it('deve_falhar_quando_telefone_invalido', async () => {
    const repo = new InMemoryClientRepository();
    (repo as any)['items'].push({ id: '1', name: 'John', phone: '55999999999' });
    const usecase = new UpdateClient(repo as any);
    await expect(
      usecase.execute({ id: '1', phone: 'abc' })
    ).rejects.toThrowError();
  });
});

