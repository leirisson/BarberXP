import { Client } from '@domain/clients/Client';

type Repo = {
  findById: (id: string) => Promise<{ id: string; name: string; phone: string; address?: string; dateOfBirth?: Date } | null>;
};

export class GetClient {
  private repo: Repo;
  constructor(repo: Repo) {
    this.repo = repo;
  }
  async execute(input: { id: string }): Promise<Client> {
    const found = await this.repo.findById(input.id);
    if (!found) throw new Error('Cliente não encontrado');
    return Client.create({
      name: found.name,
      phone: found.phone,
      address: found.address,
      dateOfBirth: found.dateOfBirth,
    });
  }
}
