import { Client } from '@domain/clients/Client';

type Repo = {
  findByPhone: (phone: string) => Promise<any>;
  save: (client: { id?: string; name: string; phone: string; address?: string; dateOfBirth?: Date }) => Promise<void>;
};

export class CreateClient {
  private repo: Repo;
  constructor(repo: Repo) {
    this.repo = repo;
  }
  async execute(input: { name: string; phone: string; address?: string; dateOfBirth?: Date }) {
    const existing = await this.repo.findByPhone(input.phone);
    if (existing) throw new Error('Telefone já cadastrado');
    const client = Client.create(input);
    await this.repo.save({
      name: client.name,
      phone: client.phone.value,
      address: client.address,
      dateOfBirth: client.dateOfBirth,
    });
    return client;
  }
}
