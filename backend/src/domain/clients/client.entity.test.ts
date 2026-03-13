import { describe, it, expect } from 'vitest';
import { Client } from '@domain/clients/Client';

describe('Cliente (Entidade)', () => {
  it('deve_criar_cliente_quando_dados_validos', () => {
    const client = Client.create({ name: 'John Doe', phone: '55999999999', address: 'Rua B', dateOfBirth: new Date(1995, 4, 20) });
    expect(client.name).toBe('John Doe');
    expect(client.phone.value).toBe('55999999999');
    expect(client.address).toBe('Rua B');
    expect(client.dateOfBirth?.getFullYear()).toBe(1995);
  });

  it('deve_falhar_quando_nome_ausente', () => {
    expect(() => Client.create({ name: '', phone: '55999999999' })).toThrow();
  });

  it('deve_falhar_quando_telefone_invalido', () => {
    expect(() => Client.create({ name: 'John Doe', phone: '123' })).toThrow();
    expect(() => Client.create({ name: 'John Doe', phone: 'abc' })).toThrow();
  });
});

