import { Client } from '@domain/clients/Client';

type Repo = {
  findById: (id: string) => Promise<{ id: string; name: string; phone: string; address?: string; dateOfBirth?: Date } | null>;
  findByPhone: (phone: string) => Promise<{ id: string } | null>;
  update: (client: { id: string; name: string; phone: string; address?: string; dateOfBirth?: Date }) => Promise<void>;
};

export class UpdateClient {
  private repo: Repo;
  constructor(repo: Repo) {
    this.repo = repo;
  }
  async execute(input: { id: string; name?: string; phone?: string; address?: string; dateOfBirth?: Date }): Promise<Client> {
    throw new Error('Not implemented');
  }
}

